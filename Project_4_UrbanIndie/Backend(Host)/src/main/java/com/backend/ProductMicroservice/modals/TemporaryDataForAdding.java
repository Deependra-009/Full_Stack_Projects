package com.backend.ProductMicroservice.modals;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TemporaryDataForAdding {
    List<ApparelCategoryData> data;
}
