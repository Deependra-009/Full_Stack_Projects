import { Component } from '@angular/core';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { OrderService } from 'src/app/Core/Services/ControllerService/OrderService/order.service';

interface Order {
  order_id: string;
  products: any[];
  user_id: String;
  order_total_amount: String;
  order_status: String,
  payment_mode: String,
  order_date: Date;
}


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }
  navigateToOrder(orderId: string) {
    // console.log("this is order id", orderId);
  }

  cancelOrder(orderId: string): void {
    const userId = String(AuthServiceFunctionsService.getAccessUserFromCookie());
    this.orderService.cancelOrder(orderId, userId).subscribe({
      next: () => {
        this.getAllOrders();
      },
      error: (error) => {
        console.error('Error in cancelling order:', error);
      }
    });
  }

  getAllOrders(year?: number, month?: number, all?: boolean) {
    this.orderService.getAllOrdersForUser(String(AuthServiceFunctionsService.getAccessUserFromCookie()), year, month, all).subscribe({
      next: response => {
        this.orders = response.sort((a: Order, b: Order) => {
          const dateA = new Date(a.order_date).getTime();
          const dateB = new Date(b.order_date).getTime();
          return dateB - dateA;
        });
      },
      error: error => {
        console.error('Error fetching orders:', error);
      }
    });
  }
  getCurrentYear(): number {
    return new Date().getFullYear();
  }


  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }
}
