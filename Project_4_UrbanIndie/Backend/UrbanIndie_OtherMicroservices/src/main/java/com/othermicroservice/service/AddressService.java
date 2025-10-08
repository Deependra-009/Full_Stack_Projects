package com.othermicroservice.service;

import com.othermicroservice.entities.AddressEntity;
import com.othermicroservice.payload.request.AddressRequest;
import com.othermicroservice.payload.response.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressRequest saveAddress(AddressRequest addressRequest);

    AddressRequest updateAddress(String user_id,String id,AddressRequest addressRequest);

    List<AddressEntity> getAllTheAddress();

    void removeAddress(String id, String user_id);

     AddressResponse getAllAddressesOfUser(String user_id);
}
