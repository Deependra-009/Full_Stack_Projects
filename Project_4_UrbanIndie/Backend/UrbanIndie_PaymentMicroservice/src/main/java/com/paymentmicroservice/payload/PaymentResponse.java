package com.paymentmicroservice.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    private String paymentId;
    private String paymentStatus;
    private String paymentMode;
    private String amount;
    private Instant paymentDate;
    private String orderId;
}