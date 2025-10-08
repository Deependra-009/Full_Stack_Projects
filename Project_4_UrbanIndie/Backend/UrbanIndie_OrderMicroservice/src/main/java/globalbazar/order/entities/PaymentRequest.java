package globalbazar.order.entities;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentRequest {
    private String orderId;
    private String amount;
    private String paymentMode;
}

