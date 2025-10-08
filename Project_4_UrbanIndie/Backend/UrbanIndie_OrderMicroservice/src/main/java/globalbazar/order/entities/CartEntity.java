package globalbazar.order.entities;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection ="CartEntity")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CartEntity {
    @Id
    private String cart_id;
    private String user_id;
    private List<String> product_id_and_product_quantity_and_product_colour_and_product_size;
}
