package globalbazar.order.entities;

import globalbazar.order.requestDTO.OrderedProductsList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Orders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderEntity {

    @Id
    private String order_id;

    private String user_id;

    private String order_status;

    private String payment_status;

    private String order_total_amount;

    private Instant order_date;

    private List<OrderedProductsList> products = new ArrayList<>();

    private AddressEntity addressOfDelivery;

    private String paymentMethodSelected;
}
