package globalbazar.order.responseDTO;

import globalbazar.order.entities.AddressEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.time.Instant;
import java.util.List;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Builder
@Setter
@Getter
public class OrderResponseDTO {
	
	private String order_id;
	private String user_id;
    private String order_total_amount;
    private String order_status;
    private String payment_mode;
    private Instant order_date;
    private AddressEntity addressOfDelivery;
    private List<ProductResponseDTO> products;
}

