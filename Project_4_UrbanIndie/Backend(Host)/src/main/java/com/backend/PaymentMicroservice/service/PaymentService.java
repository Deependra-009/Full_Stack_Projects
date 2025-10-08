package com.backend.PaymentMicroservice.service;

import com.backend.PaymentMicroservice.payload.PaymentRequest;
import com.backend.PaymentMicroservice.payload.PaymentResponse;

import java.time.Instant;

public interface PaymentService {
    PaymentResponse collectPayment(PaymentRequest paymentRequest);
    PaymentResponse getPAymentDetailsByOrderId(String orderId);
    PaymentResponse getPaymentDetailsByPaymentDate(Instant date);
}
