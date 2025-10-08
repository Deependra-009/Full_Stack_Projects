package globalbazar.order.responseDTO;

//import lombok.AllArgsConstructor;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
public class PaymentResponse {
    private String paymentId;
    private String paymentStatus;
    private String paymentMode;
    private String amount;
    private Instant paymentDate;
    private String orderId;
}
