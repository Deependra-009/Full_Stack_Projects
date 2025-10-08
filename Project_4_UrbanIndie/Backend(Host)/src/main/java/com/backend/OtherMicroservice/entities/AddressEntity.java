package com.backend.OtherMicroservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "AddressCollection")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AddressEntity {
    @Id
    private String id;
    private String user_id;
    private Boolean isDefaultAddress;
    private String name;
    private String addressType;
    private String addressLine1;
    private String addressLine2;
    private String addressCity;
    private String addressState;
    private String addressPinCode;
    private String mobileNumber;
    //transient variables
    private transient String expectedDeliveryDate;
    private transient Boolean CodAvailable;

}
