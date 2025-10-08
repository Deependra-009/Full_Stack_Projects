package com.productmicroservice.modals;

import lombok.*;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "AllFiltersCollections")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AllFiltersEntity {

    @Id
    private String filter_id;
    private String brand_name;
    private String department;
    private List<String> product;

}
