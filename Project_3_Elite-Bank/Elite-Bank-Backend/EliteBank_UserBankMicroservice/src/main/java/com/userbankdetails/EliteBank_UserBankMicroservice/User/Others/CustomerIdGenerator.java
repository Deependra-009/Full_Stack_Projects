package com.userbankdetails.EliteBank_UserBankMicroservice.User.Others;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomerIdGenerator {

    // Assume Elite Banking's customer ID prefix is "ELBK"
    private static final String CUSTOMER_ID_PREFIX = "ELBK";

    // Function to generate a customer ID based on the current date and a random 4-digit number
    public static String generateCustomerId() {
        // Get the current date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String currentDate = dateFormat.format(new Date());

        // Generate a random 4-digit number
        String randomDigits = String.format("%04d", (int) (Math.random() * 10000));

        // Combine prefix, date, and random digits to form the customer ID
        return CUSTOMER_ID_PREFIX + currentDate + randomDigits;
    }


}
