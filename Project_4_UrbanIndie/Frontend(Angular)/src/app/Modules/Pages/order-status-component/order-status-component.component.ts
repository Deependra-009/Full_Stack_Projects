import { Component } from '@angular/core';
import { AnimationOptions } from "ngx-lottie";
import { OrderResponseService } from 'src/app/Core/Services/ControllerService/OrderService/order-response.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-status-component',
  templateUrl: './order-status-component.component.html',
  styleUrls: ['./order-status-component.component.css']
})
export class OrderStatusComponentComponent {
  orderResponseData: any;
  constructor(private orderResponseService: OrderResponseService,private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.orderResponseData = this.orderResponseService.getOrderResponse();
    setTimeout(() => {
      this.router.navigate(['/user/order-page'], { relativeTo: this.route });
    }, 120000);
  }

  // h
  orderPlacedAnimation: AnimationOptions = {
    path: "/assets/Images/lottieFiles/orderPlacedAnimation.json",
    loop: false,
  };
  orderBoxAnimation: AnimationOptions = {
    path: "/assets/Images/lottieFiles/orderBox.json",  
     loop: false
  }

}
