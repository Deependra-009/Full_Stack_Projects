import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductController } from '../../Constant_Data/URL';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductApiGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  getAllProduct(user_id:String,link:String=""){
    

    const id=(user_id=='null')?"NOT_LOGIN":user_id;   
    let url=`${ProductController}/get-all-product/${id}/${link}`;
   
    
    if(link.length==0){
      url=url.substring(0,url.length-1);
    }
     
    return this.http.get(url);
  }
  
  getMoreProducts(
    user_id: string,
    page: number,
    itemsPerPage: number,
    department: string | null,
    apparelcategory: string | null,
    producttype: string | null
  ): Observable<{ data: ProductModal[], code: number }> {
    let apiUrl = `${ProductController}/get-all-product/${user_id == 'null' ? "NOT_LOGIN" : user_id}/${department || 'null'}/${apparelcategory || 'null'}/${producttype || 'null'}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', itemsPerPage.toString());
  
    return this.http.get<ProductModal[]>(apiUrl, { params, observe: 'response' }).pipe(
      map((response:any) => {
        return { data: response.body.content, code: response.status };
      })
    );
  }

  getApparelCategoryData(department_name:string,apparel_category_name:string){
    return this.http.get(`${ProductController}/apparel-category-data/${department_name}/${apparel_category_name}`);
  }
   
}
