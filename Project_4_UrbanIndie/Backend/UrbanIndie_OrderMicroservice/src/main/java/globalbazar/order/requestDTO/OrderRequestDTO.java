package globalbazar.order.requestDTO;

import globalbazar.order.entities.AddressEntity;
import globalbazar.order.entities.CartEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderRequestDTO {
    private String user_id;
    private String order_total_amount;
    private List<OrderedProductsList> order_products = new ArrayList<>();
    private String payment_mode;
    private CartEntity cart;
    private AddressEntity address;
}


