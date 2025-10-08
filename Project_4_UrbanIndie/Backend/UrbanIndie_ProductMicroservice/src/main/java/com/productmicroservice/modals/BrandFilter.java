package com.productmicroservice.modals;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandFilter {

    private List<AllFiltersEntity> brand;
}
