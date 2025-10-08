package com.backend.ProductMicroservice.modals;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandFilter {

    private List<AllFiltersEntity> brand;
}
