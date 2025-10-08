import { AfterViewInit, Component } from '@angular/core';
import { KidsData } from 'src/app/Core/Constant_Data/KidsData';

@Component({
  selector: 'app-kid-page',
  templateUrl: './kid-page.component.html',
  styleUrls: ['./kid-page.component.css']
})
export class KidPageComponent  implements AfterViewInit{
  items = [
    { image: 'https://source.unsplash.com/random/1550x450/?kids-clothes' },
    { image: 'https://source.unsplash.com/random/1550x450/?kids-jeans' },
    { image: 'https://source.unsplash.com/random/1550x450/?kids-shoes' },
    { image: 'https://source.unsplash.com/random/1550x450/?kids-tshirts' },
    { image: 'https://source.unsplash.com/random/1550x450/?kids-coats' },

   

    // https://source.unsplash.com/random/1550x350
    // Add more items as needed
  ];
  ProductData=KidsData

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel(): void {
    // Carousel initialization code
  }

  reinitializeCarousel(): void {
    // Call this method whenever you want to reinitialize the carousel
    this.initializeCarousel();
  }
  
}
