import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styleUrls: ['./product-card2.component.css']
})
export class ProductCard2Component {

  @Input() New_Arrival:any=[];
  @Input() ContainerTitle="";

}
