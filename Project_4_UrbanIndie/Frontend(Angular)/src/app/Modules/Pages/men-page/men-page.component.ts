import { Component } from '@angular/core';
import { MenData } from 'src/app/Core/Constant_Data/MenData';

@Component({
  selector: 'app-men-page',
  templateUrl: './men-page.component.html',
  styleUrls: ['./men-page.component.css']
})
export class MenPageComponent {
  items = [
    { image: 'https://source.unsplash.com/random/1550x450/?men-clothes' },
    { image: 'https://source.unsplash.com/random/1550x450/?mens-jeans' },
    { image: 'https://source.unsplash.com/random/1550x450/?mens-shoes' },
    { image: 'https://source.unsplash.com/random/1550x450/?mens-tshirts' },
    { image: 'https://source.unsplash.com/random/1550x450/?mens-bottomwear' },

   

    // https://source.unsplash.com/random/1550x350
    // Add more items as needed
  ];
  MenData=MenData

}
