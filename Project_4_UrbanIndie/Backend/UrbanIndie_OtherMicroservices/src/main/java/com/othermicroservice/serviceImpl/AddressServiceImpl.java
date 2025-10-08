package com.othermicroservice.serviceImpl;

import com.othermicroservice.Repository.AddressRepo;
import com.othermicroservice.entities.AddressEntity;
import com.othermicroservice.payload.request.AddressRequest;
import com.othermicroservice.payload.response.AddressDto;
import com.othermicroservice.payload.response.AddressResponse;
import com.othermicroservice.payload.response.AddressServiceCustomException;
import com.othermicroservice.service.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@RequiredArgsConstructor
@Log4j2
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;

    @Override
    public AddressRequest saveAddress(AddressRequest addressRequest) {
        log.info("AddressServiceImpl| saveAddress is called");
        log.info("AddressServiceImpl | saveAddress | Address Details: {}", addressRequest);

        AddressEntity addressEntity = AddressEntity.builder()
                .user_id(addressRequest.getUserId())
                .isDefaultAddress(addressRequest.getIsDefaultAddress())
                .name(addressRequest.getName())
                .addressType(addressRequest.getAddressType())
                .addressLine1(addressRequest.getAddressLine1())
                .addressCity(addressRequest.getAddressCity())
                .addressState(addressRequest.getAddressState())
                .addressPinCode(addressRequest.getAddressPinCode())
                .mobileNumber(addressRequest.getMobileNumber())
                .build();

        addressRepo.save(addressEntity);
        return addressRequest;
    }


    @Override
    public AddressRequest updateAddress(String user_id, String id, AddressRequest addressRequest) {
        Optional<AddressEntity> optionalAddress = addressRepo.findById(id);

        if (optionalAddress.isPresent()) {
            AddressEntity addressEntity = optionalAddress.get();

            // Check if the user_id of the address matches the provided user_id
            if (!addressEntity.getUser_id().equals(user_id)) {
                throw new AddressServiceCustomException(
                        "Address does not belong to the specified user",
                        "ADDRESS_NOT_FOUND"
                );
            }

            // Update the properties from the request
            addressEntity.setName(addressRequest.getName());
            addressEntity.setAddressType(addressRequest.getAddressType());
            addressEntity.setAddressLine1(addressRequest.getAddressLine1());
            addressEntity.setAddressCity(addressRequest.getAddressCity());
            addressEntity.setAddressState(addressRequest.getAddressState());
            addressEntity.setIsDefaultAddress(addressRequest.getIsDefaultAddress());
            addressEntity.setMobileNumber(addressRequest.getMobileNumber());
            addressEntity.setAddressPinCode(addressRequest.getAddressPinCode());

            // Save the updated entity
            AddressEntity updatedAddress = addressRepo.save(addressEntity);
            // Convert and return the updated address response
            return convertToAddressRequest(updatedAddress);
        } else {
            throw new AddressServiceCustomException(
                    "Address with given ID: " + id + " not found",
                    "ADDRESS_NOT_FOUND"
            );
        }
    }

    private AddressRequest convertToAddressRequest(AddressEntity addressEntity) {
        AddressRequest addressRequest = new AddressRequest();
        // Copy properties from addressEntity to addressRequest
        addressRequest.setUserId(addressEntity.getUser_id());
        addressRequest.setIsDefaultAddress(addressEntity.getIsDefaultAddress());
        addressRequest.setName(addressEntity.getName());
        addressRequest.setAddressType(addressEntity.getAddressType());
        addressRequest.setAddressLine1(addressEntity.getAddressLine1());
        addressRequest.setAddressLine2(addressEntity.getAddressLine2());
        addressRequest.setAddressCity(addressEntity.getAddressCity());
        addressRequest.setAddressState(addressEntity.getAddressState());
        addressRequest.setAddressPinCode(addressEntity.getAddressPinCode());
        addressRequest.setMobileNumber(addressEntity.getMobileNumber());
        return addressRequest;
    }

    @Override
    public List<AddressEntity> getAllTheAddress() {
        return this.addressRepo.findAll();
    }

    @Override
    public void removeAddress(String id, String user_id) {
        log.info("Address id: {}", id);
        log.info("User id: {}", user_id);
        if (!addressRepo.existsById(id) && !addressRepo.existsById(user_id)) {
            log.info("Im in this loop {}", !addressRepo.existsById(id));
            throw new AddressServiceCustomException(
                    "Address with given with Id: " + id + " not found:",
                    "Address_NOT_FOUND");
        }
        log.info("Deleting Address with id: {}", id);
        addressRepo.deleteById(id);
    }

    @Override
    public AddressResponse getAllAddressesOfUser(String user_id) {
        List<AddressEntity> addressEntities = addressRepo.findAddressParicularUser(user_id);
        if (addressEntities.isEmpty()) {
            // If no addresses are found, return an AddressResponse with an empty list
            return AddressResponse.builder()
                    .userId(user_id)
                    .addresses(Collections.emptyList())
                    .build();
        } else {
            // Convert the list of AddressEntities to a single AddressResponse
            return AddressResponse.builder()
                    .userId(user_id)
                    .addresses(convertToAddressDTOList(addressEntities))
                    .build();
        }
    }
    private List<AddressDto> convertToAddressDTOList(List<AddressEntity> addressEntities) {
        return addressEntities.stream()
                .map(this::convertToAddressDTO)
                .collect(Collectors.toList());
    }

    private AddressDto convertToAddressDTO(AddressEntity addressEntity) {
        AddressDto addressDTO = new AddressDto();
        addressDTO.setId(addressEntity.getId());
        addressDTO.setIsDefaultAddress(addressEntity.getIsDefaultAddress());
        addressDTO.setName(addressEntity.getName());
        addressDTO.setAddressType(addressEntity.getAddressType());
        addressDTO.setAddressLine1(addressEntity.getAddressLine1());
        addressDTO.setAddressCity(addressEntity.getAddressCity());
        addressDTO.setAddressState(addressEntity.getAddressState());
        addressDTO.setAddressPinCode(addressEntity.getAddressPinCode());
        addressDTO.setMobileNumber(addressEntity.getMobileNumber());
        addressDTO.setExpectedDeliveryDate(calculateExpectedDeliveryDate());
        addressDTO.setCodAvailable(true);
        return addressDTO;
    }
    private String calculateExpectedDeliveryDate() {
        LocalDate currentDate = LocalDate.now();
        LocalDate deliveryDate = currentDate.plusDays(2);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d, yyyy");
        return deliveryDate.format(formatter);
    }

}
