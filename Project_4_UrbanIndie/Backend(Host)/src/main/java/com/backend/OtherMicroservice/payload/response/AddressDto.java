package com.backend.OtherMicroservice.payload.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AddressDto {
    private String id;
    private Boolean isDefaultAddress;
    private String name;
    private String addressType;
    private String addressLine1;
    private String addressCity;
    private String addressState;
    private String addressPinCode;
    private String mobileNumber;
    //transient variables
    private transient String expectedDeliveryDate;
    private transient Boolean CodAvailable;
}
