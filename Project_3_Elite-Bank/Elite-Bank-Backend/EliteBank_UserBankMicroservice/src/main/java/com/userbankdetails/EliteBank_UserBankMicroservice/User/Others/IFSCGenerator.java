package com.userbankdetails.EliteBank_UserBankMicroservice.User.Others;

public class IFSCGenerator {

    // Assume Elite Banking's bank code is ELBK
    private static final String BANK_CODE = "ELBK";

    // Assume Elite Banking's branch code is 001
    private static final String BRANCH_CODE = "101";

    // Randomly generated 6-digit alphanumeric string for account identification
    private static final String ACCOUNT_IDENTIFIER = generateRandomString(6);

    // Function to generate a random alphanumeric string of a specified length
    private static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomString = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            randomString.append(characters.charAt(index));
        }

        return randomString.toString();
    }

    // Function to generate IFSC code for Elite Banking
    public static String generateIFSC() {
        // Combine bank code, branch code, and account identifier to form the IFSC code
        return BANK_CODE + BRANCH_CODE + ACCOUNT_IDENTIFIER;
    }


}

