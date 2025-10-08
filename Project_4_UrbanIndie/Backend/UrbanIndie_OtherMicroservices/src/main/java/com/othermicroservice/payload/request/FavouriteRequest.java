package com.othermicroservice.payload.request;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavouriteRequest {
    private String user_id;
    private String product_id;
}
