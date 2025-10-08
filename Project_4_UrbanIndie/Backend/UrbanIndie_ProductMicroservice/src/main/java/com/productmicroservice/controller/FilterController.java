package com.productmicroservice.controller;

import com.productmicroservice.modals.AllFilterResponse;
import com.productmicroservice.modals.AllFiltersEntity;
import com.productmicroservice.modals.BrandFilter;
import com.productmicroservice.modals.Filters;
import com.productmicroservice.responseDTO.ProductResponseDTO;
import com.productmicroservice.services.FilterService;
import com.productmicroservice.servicesimplementation.AllFilterEntityServiceImpl;
import com.productmicroservice.servicesimplementation.FiltersServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product/filters")
@RequiredArgsConstructor
@Log4j2
public class FilterController {

//    private final FilterService filterService;
    @Autowired
    private FiltersServiceImpl filtersService;

    /****************************************************************************************************************
     * Apply Filters
     ****************************************************************************************************************/

    @PostMapping("/apply/{isLogin}")
    public List<ProductResponseDTO> applyFilters(@PathVariable("isLogin") String isLogin,@RequestBody Filters filters) {
        log.info("FilterController | applyFilters is called");
        log.info("Filter Data received: {}", filters);
        System.out.println(isLogin);
        System.out.println(filters);
        return this.filtersService.getAllProductAfterFilter(isLogin,filters.getFilterName());
//        return null;
    }

//    @PostMapping("/add-all-filters")
//    public BrandFilter addFilters(@RequestBody BrandFilter data){
//        System.out.println(data);
//        this.allFilterEntityService.addAllFilterData(data);
//        return null;
//    }
//
//    @GetMapping("/get-all-filters")
//    public List<AllFiltersEntity> getAllFilter(@RequestBody AllFilterResponse data){
//
//        return this.allFilterEntityService.getFiltersData(data);
//    }
//


}


//{
//        "PriceRange": ["269","999"],
//        "brands": ["Puma", "Adidas","HIGHLANDER"],
//        "colors": ["Red", "Blue"],
//        "styles": ["Casual", "Sport"],
//        "availability": true,
//        "discount": ["10", "20"],
//        "customerRaings": ["4", "5"],
//        "necktype": ["Round Neck"],
//        "ocassion": ["Casual"],
//        "patterns": ["Striped"],
//        "sleveType": ["Full Sleeves"],
//        "fit": ["Regular"]
//        }
