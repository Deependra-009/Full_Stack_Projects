package com.paymentmicroservice.service.impl;

import com.paymentmicroservice.exception.PaymentServiceCustomException;
import com.paymentmicroservice.model.TransactionDetails;
import com.paymentmicroservice.payload.PaymentRequest;
import com.paymentmicroservice.payload.PaymentResponse;
import com.paymentmicroservice.repo.TransactionDetailsRepository;
import com.paymentmicroservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final TransactionDetailsRepository transactionDetailsRepository;

    @Override
    public PaymentResponse collectPayment(PaymentRequest paymentRequest) {
        log.info("PaymentServiceImpl | collectPayment is called");

        log.info("PaymentServiceImpl | collectPayment | Payment Details: {}", paymentRequest);

        // Generate a random alphanumeric reference number
        String referenceNumber = RandomStringUtils.randomAlphanumeric(10);


        TransactionDetails transactionDetails = TransactionDetails.builder().paymentDate(Instant.now())
                .paymentMode(paymentRequest.getPaymentMode())
                .paymentStatus("SUCCESS")
                .orderId(paymentRequest.getOrderId())
                .referenceNumber(referenceNumber)
                .amount(paymentRequest.getAmount()).build();
        transactionDetails = transactionDetailsRepository.save(transactionDetails);
        PaymentResponse response = new PaymentResponse();
        copyProperties(transactionDetails, response);
        log.info("Transaction Completed with amount: {}", transactionDetails.getAmount());
        return response;
    }

    @Override
    public PaymentResponse getPAymentDetailsByOrderId(String orderId) {


        log.info("PaymentServiceImpl | getPaymentDetailsByOrderId is called");

        log.info("PaymentServiceImpl | getPaymentDetailsByOrderId | Getting payment details for the Order Id: {}", orderId);

        TransactionDetails transactionDetails =
                transactionDetailsRepository.findByOrderId(orderId).
                        orElseThrow(() -> new
                                PaymentServiceCustomException
                                ("TransactionDetails with given id not found", "TRANSACTION_NOT_FOUND"));

        PaymentResponse paymentResponse = PaymentResponse.builder()
                .paymentId(transactionDetails.getPaymentId())
                .paymentMode(transactionDetails.getPaymentMode())
                .paymentDate(transactionDetails.getPaymentDate())
                .orderId(transactionDetails.getOrderId())
                .paymentStatus(transactionDetails.getPaymentStatus())
                .amount(transactionDetails.getAmount())
                .build();

        log.info("PaymentServiceImpl | getPaymentDetailsByOrderId | paymentResponse: {}", paymentResponse.toString());

        return paymentResponse;
    }

    @Override
    public PaymentResponse getPaymentDetailsByPaymentDate(Instant date) {
        return null;
    }
}
