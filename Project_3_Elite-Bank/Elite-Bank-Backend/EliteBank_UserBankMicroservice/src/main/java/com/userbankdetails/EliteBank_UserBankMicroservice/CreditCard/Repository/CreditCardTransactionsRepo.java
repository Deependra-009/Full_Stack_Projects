package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardTransactionsRepo extends JpaRepository<CreditCardEntity,Long> {
}
