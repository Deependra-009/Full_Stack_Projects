package com.backend.OrderMicroservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressEntity {
    private String name;
    private String addressType;
    private String addressLine1;
    private String addressLine2;
    private String addressCity;
    private String addressState;
    private String addressPinCode;
    private String mobileNumber;
}


