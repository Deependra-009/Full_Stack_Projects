import { Component } from '@angular/core';
import { WomenData } from 'src/app/Core/Constant_Data/WomenData';

@Component({
  selector: 'app-women-page',
  templateUrl: './women-page.component.html',
  styleUrls: ['./women-page.component.css']
})
export class WomenPageComponent {
  items = [
    { image: 'https://source.unsplash.com/random/1550x450/?woman-clothes' },
    { image: 'https://source.unsplash.com/random/1550x450/?womans-jeans' },
    { image: 'https://source.unsplash.com/random/1550x450/?womans-fashion' },
    { image: 'https://source.unsplash.com/random/1550x450/?womans-ethnic-wear' },
    { image: 'https://source.unsplash.com/random/1550x450/?womans-shoes' },

   

    // https://source.unsplash.com/random/1550x350
    // Add more items as needed
  ];
  ProductData=WomenData;
}
