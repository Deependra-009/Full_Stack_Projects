import { Component, OnInit } from '@angular/core';
import { hp_category_images, hp_new_arrival_images, hp_recommended_images, hps_images } from 'src/app/Core/Constant_Data/Images_Url/home_page';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  categories_scroll_images=hps_images;

  New_Arrival_Images=hp_new_arrival_images;

  Recommended_Images=hp_recommended_images;

  Category_Images=hp_category_images;
  constructor(
  ){
  }

  ngOnInit(): void {
    
  }


}
