package com.paymentmicroservice.controllers;

import com.paymentmicroservice.payload.PaymentRequest;
import com.paymentmicroservice.payload.PaymentResponse;
import com.paymentmicroservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@Log4j2
public class PaymentController {
private final PaymentService paymentService;

@PostMapping("/collect-payment")
    public ResponseEntity<PaymentResponse> collectPayment(@RequestBody PaymentRequest paymentRequest){
    log.info("PaymentController | Collect Payment is called");

    log.info("PaymentController | CollectPayment | paymentRequest : " + paymentRequest.toString());
    return new ResponseEntity<>(paymentService.collectPayment(paymentRequest), HttpStatus.OK);
}

    @GetMapping("/get-order/{orderId}")

    public ResponseEntity<PaymentResponse> getPaymentDetailsByOrderId(@PathVariable String orderId) {

        log.info("PaymentController | getPaymentDetailsByOrderId is called");

        log.info("PaymentController | getPaymentDetailsByOrderId | orderId : " + orderId);


        return new ResponseEntity<>(
                paymentService.getPAymentDetailsByOrderId(orderId), HttpStatus.OK);
    }


}
