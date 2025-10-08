package com.productmicroservice.modals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Filters {

    HashMap<String, List<String>> filterName;

}
