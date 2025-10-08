import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() items: any[] = [];

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
