package com.userbankdetails.EliteBank_UserBankMicroservice.User.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.User.Controller.Interface.UserControllerInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.LoginRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.LoginResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation.AccountEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Others.CustomerIdGenerator;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Others.IFSCGenerator;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Security.JwtHelper;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.ServiceImplementation.CustomUserDetailsService;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.ServiceImplementation.UserEntityServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController implements UserControllerInterface {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper helper;

    private Logger logger= LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserEntityServiceImpl userEntityServiceImpl;

    @Autowired
    private AccountEntityServiceImpl accountEntityService;

    @GetMapping("/test")
    public String test(){
        return "Home Controller Successfully";
    }


    @PostMapping("/add-user-data")
    public UserEntity addData(@RequestBody RegisterRequestDTO userdata){
        System.out.println(userdata);
        LocalDate date=LocalDate.now();
        AccountEntity accountEntity=AccountEntity
                .builder()
                .customer_id(CustomerIdGenerator.generateCustomerId())
                .account_number(generateRandomNumber(12))
                .account_ifsccode(IFSCGenerator.generateIFSC())
                .account_type("SAVINGS")
                .account_balance(userdata.getDeposit_amount())
                .account_opening_date(""+date)
                .build();

        AccountEntity newaccount=this.accountEntityService.createAccount(accountEntity);

        UserEntity userEntity=new UserEntity();

        BeanUtils.copyProperties(userdata,userEntity);



        if(newaccount!=null){
            userEntity.setRole("USER");
            userEntity.setAccountdata(newaccount);
            userEntity=this.userEntityServiceImpl.addUserData(userEntity);
        }

        return userEntity;

    }

    public static String generateRandomNumber(int digits) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(digits);
        // Generate random digits
        for (int i = 0; i < digits; i++) {
            int digit = random.nextInt(10); // Generate a random digit (0-9)
            sb.append(digit);
        }
        return sb.toString();
    }


    @Override
    @GetMapping("/get-all-data")
    public List<UserEntity> getAllUserData() {
        return this.userEntityServiceImpl.getAllUserData();
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {

        this.doAuthenticate(loginRequestDTO.getAccount_holder_email(), loginRequestDTO.getUser_password());

        UserEntity userDetails = userDetailsService.loadUserByUsername(loginRequestDTO.getAccount_holder_email());

        String token = this.helper.generateToken(userDetails);
        String user_id=userDetails.getUser_id();
        if(user_id==null){
            return new ResponseEntity<>(new LoginResponseDTO(user_id,"WRONG TOKEN","Wrong Credentials"),HttpStatus.UNAUTHORIZED);
        }
        LoginResponseDTO loginResponseDTO=LoginResponseDTO.builder()
                .jwtToken(token)
                .message("Correct Credentials")
                .user_id(userDetails.getUser_id())
                .build();



        return new ResponseEntity<>(loginResponseDTO,HttpStatus.OK);

    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            authenticationManager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @Override
    @PutMapping("/profile-update")
    public UserEntity updateProfile(@RequestBody UserEntity userdata) {

        return this.userEntityServiceImpl.updateProfile(userdata);
    }

    @GetMapping("/get-user/{user_id}")
    public RegisterResponseDTO getParticularUserData(@PathVariable("user_id") String user_id) {
        return this.userEntityServiceImpl.getParticularUserData(user_id);
    }
}
