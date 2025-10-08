package com.othermicroservice.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {
    private String userId;
    private Boolean isDefaultAddress;
    private String name;
    private String addressType;
    private String addressLine1;
    private String addressLine2;
    private String addressCity;
    private String addressState;
    private String addressPinCode;
    private String mobileNumber;
}
