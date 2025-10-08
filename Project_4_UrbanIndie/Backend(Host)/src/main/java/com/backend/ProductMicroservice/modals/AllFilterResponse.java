package com.backend.ProductMicroservice.modals;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AllFilterResponse {

    private String department;
    private List<String> brand;
    private List<String> product;
    private List<String> colors;

}
