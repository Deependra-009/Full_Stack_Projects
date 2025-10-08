package globalbazar.order.feignclient;

import globalbazar.order.entities.PaymentRequest;
import globalbazar.order.responseDTO.PaymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(url="http://localhost:8087/payment",name="PAYMENT-SERVICE")
public interface PaymentServiceFeignClient {
    @PostMapping("/collect-payment")
  PaymentResponse collectPayment(PaymentRequest paymentRequest);
}
