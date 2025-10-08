package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="ManageFavourite")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ManageFavouriteEntity {

    @Id
    private String favourite_id;
    private String account_number;
    private String ifsc_code;
    private String description;
    private String beneficiary_name;
    private String amount;
    private String user_id;

}
