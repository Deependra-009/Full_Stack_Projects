package globalbazar.order.entities;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductReviews {

    private String user_name;
    private String rating;
    private String title;
    private String body;
    private String date;
}
