package com.backend.ProductMicroservice.servicesimplementation;


import com.backend.ProductMicroservice.modals.AllFilterResponse;
import com.backend.ProductMicroservice.modals.AllFiltersEntity;
import com.backend.ProductMicroservice.modals.BrandFilter;
import com.backend.ProductMicroservice.repository.AllFiltersEntityRepository;
import com.backend.ProductMicroservice.services.AllFilterEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AllFilterEntityServiceImpl  implements AllFilterEntityService {

    @Autowired
    private AllFiltersEntityRepository allFiltersEntityRepository;
//    @Override
    public AllFiltersEntity addAllFilterData(BrandFilter data) {

        for(AllFiltersEntity item: data.getBrand()){
            this.allFiltersEntityRepository.save(item);
        }


        return null;
    }
    public List<AllFiltersEntity> getFiltersData(AllFilterResponse data) {
        List<AllFiltersEntity> result=this.allFiltersEntityRepository.getAllFiltersOnlyDepartment(data.getDepartment(),data.getProduct());

        return result;
    }
}
