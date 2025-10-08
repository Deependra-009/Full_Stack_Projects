import {Component} from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
})
export class TestingComponent {
  items = [
    { image: 'https://source.unsplash.com/random/1550x350/?t-shirts' },
    { image: 'https://source.unsplash.com/random/1550x350/?clothes' },
    { image: '../../../../assets/Images/BG.jpeg' },
    { image: '../../../../assets/Images/home_bg_image.png' },
    { image: '../../../../assets/Images/BG.jpeg' },
  ];
  currentIndex = 0;
  isLoading = true;
  autoplayInterval: any;


  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.resetAutoplay();
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.resetAutoplay();
  }

  currentSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  ngOnInit() {
    
   
      
      setTimeout(() => {
        this.isLoading = false;this.startAutoplay();
      }, 1550);
    }

    ngOnDestroy() {
      clearInterval(this.autoplayInterval);
    }
  
    private startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  
    private resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    }
 
}
