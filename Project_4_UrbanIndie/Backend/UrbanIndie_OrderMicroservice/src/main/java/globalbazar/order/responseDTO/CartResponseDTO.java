package globalbazar.order.responseDTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CartResponseDTO {
	private String cart_id;
	private String user_id;
	private List<ProductResponseDTO> products;
}
