package com.userbankdetails.EliteBank_UserBankMicroservice;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation.AccountEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class EliteBankUserBankMicroserviceApplication implements CommandLineRunner {

	@Autowired
	private AccountEntityServiceImpl accountEntityService;


	public static void main(String[] args) {
		SpringApplication.run(EliteBankUserBankMicroserviceApplication.class, args);


	}


	@Override
	public void run(String... args) throws Exception {



	}
}
