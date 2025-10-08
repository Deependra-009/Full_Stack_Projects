package com.userbankdetails.EliteBank_UserBankMicroservice.User.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "UserDetails")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private String user_id;
    private String account_holder_first_name;
    private String account_holder_last_name;
    private String user_password;
    private String role;
    private String active;
    private String account_holder_address;
    private String account_holder_city;
    private String account_holder_state;
    private String account_holder_country;
    private String account_holder_pincode;
    private String account_holder_phone_no;

    @Column(unique = true)
    private String account_holder_email;
    private String account_holder_dob;
    private String account_holder_gender;
    private String account_holder_aadhar_no;
    private String account_holder_pan_no;
    private String account_holder_photo;
    private String account_holder_marital_status;
    private String account_holder_religion;
    private String account_holder_category;
    private String account_holder_occupation;
    private String account_holder_qualification;
    private String account_holder_staff_of_bank;
    private String account_holder_residency_status;
    private String account_holder_gross_income;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private AccountEntity accountdata;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.user_password;
    }

    @Override
    public String getUsername() {
        return this.account_holder_email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
