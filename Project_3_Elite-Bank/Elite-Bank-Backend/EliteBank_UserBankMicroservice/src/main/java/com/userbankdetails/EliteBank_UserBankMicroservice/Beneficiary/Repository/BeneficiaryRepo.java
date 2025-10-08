package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model.BeneficiaryEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaryRepo extends JpaRepository<BeneficiaryEntity,Long> {

    @Query("SELECT u FROM BeneficiaryEntity u WHERE u.user_id=:user_id")
    public List<BeneficiaryEntity> getAllBeneficiaryEntity(@Param("user_id") String user_id);

    @Modifying
    @Transactional
    @Query("delete FROM BeneficiaryEntity u WHERE u.user_id=:user_id and u.account_number=:account_number")
    public void deleteBeneficiaryByIdAndAccountNo(
            @Param("user_id") String user_id,
            @Param("account_number") String account_number
    );



}
