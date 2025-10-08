package com.backend.OtherMicroservice.service;


import com.backend.OtherMicroservice.entities.AddressEntity;
import com.backend.OtherMicroservice.payload.request.AddressRequest;
import com.backend.OtherMicroservice.payload.response.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressRequest saveAddress(AddressRequest addressRequest);

    AddressRequest updateAddress(String user_id,String id,AddressRequest addressRequest);

    List<AddressEntity> getAllTheAddress();

    void removeAddress(String id, String user_id);

     AddressResponse getAllAddressesOfUser(String user_id);
}
