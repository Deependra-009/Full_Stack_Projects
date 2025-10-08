package com.backend.OtherMicroservice.payload.response;

import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavouriteResponse {
    private String favourite_id;
    private String user_id;
    private List<ProductResponseDTO> products;
}
