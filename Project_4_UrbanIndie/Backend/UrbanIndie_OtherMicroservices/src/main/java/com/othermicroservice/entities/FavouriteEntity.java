package com.othermicroservice.entities;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "FavouritesData")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FavouriteEntity {

    @Id
    private String favourite_id;
    private String user_id;
    private List<String> product_list;
}
