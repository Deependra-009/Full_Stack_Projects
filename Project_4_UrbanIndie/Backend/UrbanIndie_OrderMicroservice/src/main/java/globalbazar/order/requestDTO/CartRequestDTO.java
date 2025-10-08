package globalbazar.order.requestDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CartRequestDTO {
    private String user_id;
    private String product_id;
    private String product_quantity;
    private String product_colour;
    private String product_size;
}
