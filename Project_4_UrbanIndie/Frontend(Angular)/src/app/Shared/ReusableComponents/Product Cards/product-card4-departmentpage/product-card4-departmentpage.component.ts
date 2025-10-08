import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card4-departmentpage',
  templateUrl: './product-card4-departmentpage.component.html',
  styleUrls: ['./product-card4-departmentpage.component.css']
})
export class ProductCard4DepartmentpageComponent {

  @Input() heading:String="";
  @Input() subHeading:String="";
  @Input() ProductData:any=[];

}
