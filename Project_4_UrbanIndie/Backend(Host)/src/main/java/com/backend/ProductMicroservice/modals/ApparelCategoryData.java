package com.backend.ProductMicroservice.modals;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "ApparelCategoryCollection")
public class ApparelCategoryData {

    @Id
    private String category_id;
    private String department_name;
    private String apparel_category_name;
    private List<ApparelCategoryModel> apparelCategoryModelList;
}
