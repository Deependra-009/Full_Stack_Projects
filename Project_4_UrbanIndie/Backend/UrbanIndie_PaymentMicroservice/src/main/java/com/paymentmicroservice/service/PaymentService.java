package com.paymentmicroservice.service;

import com.paymentmicroservice.payload.PaymentRequest;
import com.paymentmicroservice.payload.PaymentResponse;

import java.time.Instant;

public interface PaymentService {
    PaymentResponse collectPayment(PaymentRequest paymentRequest);
    PaymentResponse getPAymentDetailsByOrderId(String orderId);
    PaymentResponse getPaymentDetailsByPaymentDate(Instant date);
}
