package com.productmicroservice.servicesimplementation;

import com.productmicroservice.modals.AllFilterResponse;
import com.productmicroservice.modals.AllFiltersEntity;
import com.productmicroservice.modals.BrandFilter;
import com.productmicroservice.repository.AllFiltersEntityRepository;
import com.productmicroservice.services.AllFilterEntityService;
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
        System.out.println(data);
        List<AllFiltersEntity> result=this.allFiltersEntityRepository.getAllFiltersOnlyDepartment(data.getDepartment(),data.getProduct());

        return result;
    }
}
