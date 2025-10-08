package com.userbankdetails.EliteBank_UserBankMicroservice.User.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.ServiceImplementation.CreditCardServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.ServiceImplementation.DebitCardServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.ServiceImplementation.LoanAccountServiceImplementation;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.LoginRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Repository.UserEntityRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Service.UserEntityService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserEntityServiceImpl implements UserEntityService {

    @Autowired
    private UserEntityRepo userEntityRepo;

    @Autowired
    private LoanAccountServiceImplementation loanAccountServiceImplementation;

    @Autowired
    private StatementEntityServiceImpl statementEntityService;

    @Autowired
    private DebitCardServiceImpl debitCardService;

    @Autowired
    private CreditCardServiceImpl creditCardService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserEntity addUserData(UserEntity userdata) {
        UserEntity data=null;
        if(this.userEntityRepo.ifUserExist(userdata.getAccount_holder_email())!=null){
            return new UserEntity();
        }
        RegisterResponseDTO copydata=new RegisterResponseDTO();
        try{
            userdata.setUser_password(passwordEncoder.encode(userdata.getUser_password()));
            data=this.userEntityRepo.save(userdata);

            BeanUtils.copyProperties(data,copydata);
        }
        catch(Exception e){
            throw new RuntimeException("error");
        }
        return data;
    }

    @Override
    public List<UserEntity> getAllUserData() {

        List<UserEntity> list=this.userEntityRepo.findAll();
        List<RegisterResponseDTO> userdata=new ArrayList<>();

        for(UserEntity user:list){
            RegisterResponseDTO copydata=new RegisterResponseDTO();
            BeanUtils.copyProperties(user,copydata);
            userdata.add(copydata);

        }
        return list;


    }

    @Override
    public RegisterResponseDTO getParticularUserData(String user_id) {

        // get User Data
        UserEntity user= this.userEntityRepo.getDataOfParticularUser(user_id);
        // get Account History Data
        AccountEntity accountdata=user.getAccountdata();
        String loan_amount=this.loanAccountServiceImplementation.getTotalLoanAmount(accountdata.getAccount_number(), user_id);
        accountdata.setAccount_total_loan(loan_amount);

        user.setAccountdata(accountdata);
        LocalDate currentDate = LocalDate.now();

        // Get the start day of the current month
        LocalDate startDay = currentDate.withDayOfMonth(1);

        // Get the end day of the current month
        LocalDate endDay = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        System.out.println("Start Day: " + startDay);
        System.out.println("End Day: " + endDay);



        List<StatementEntity> currentStatement=this.statementEntityService.getParticularMonthStatement(startDay,endDay,user.getAccountdata().getAccount_number());

        // Get the Debit Card Details
        List<DebitCardResponseDTO> debitcardlist=this.debitCardService.getAllCards(user_id);

        // Get the Credit Card Details
        List<CreditCardResponseDTO> creditcardlist=this.creditCardService.getAllCreditCard(user_id);



        // create an object of user entity response
        RegisterResponseDTO response=new RegisterResponseDTO();
//        System.out.println(currentStatement);
        BeanUtils.copyProperties(user,response);

        // set statement, credit card list, debit card list into response

        response.setStatementEntityList(currentStatement);
        response.setCreditCardEntityList(creditcardlist);
        response.setDebitCardEntityList(debitcardlist);
        return response;
    }

    @Override
    public UserEntity updateProfile(UserEntity data) {
        return this.userEntityRepo.save(data);
    }

    public String loginData(LoginRequestDTO loginRequestDTO){

        return this.userEntityRepo.checkUserCredentials(loginRequestDTO.getAccount_holder_email()
                , loginRequestDTO.getUser_password()
        );

    }


}
