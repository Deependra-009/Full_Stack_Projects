package globalbazar.order.controller;

//import globalbazar.order.feignclient.AuthFeignClient;
import globalbazar.order.requestDTO.OrderRequestDTO;
import globalbazar.order.responseDTO.MessageDTO;
import globalbazar.order.responseDTO.OrderResponseDTO;
import globalbazar.order.services.impl.OrderServiceImpl;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@Log4j2
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

	private final OrderServiceImpl orderService;

//	private final AuthFeignClient authFeignClient;

	@GetMapping("/test")
	public String test() {

		return "Order Microservice Run Successfully";
	}

	/********************************************************
	 * Place Order
	 ********************************************************/

	@PostMapping("/placeorder")
	public ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
		log.info("OrderController | placeOrder is called");
		log.info("OrderController | placeOrder | orderRequest: {}", orderRequest.toString());
		System.out.println("address: "+orderRequest.getAddress().toString());
		System.out.println("product: "+orderRequest.getOrder_products().toString());

		OrderResponseDTO orderResponseDTO = orderService.placeOrder(orderRequest);

		log.info("Order Id: {}", orderResponseDTO);
		return new ResponseEntity<>(orderResponseDTO, HttpStatus.OK);
	}

	/********************************************************
	 * Cancel Order
	 ********************************************************/

	@PatchMapping ("/cancel/{orderId}/{user_id}")
	public ResponseEntity<MessageDTO> cancelOrder(@PathVariable String orderId, @PathVariable String user_id) {
		log.info("OrderController | cancelOrder is called");
		log.info("OrderServiceImpl | cancelOrder | Cancel order with Order Id : {} and User Id: {}",orderId, user_id);
		orderService.cancelOrder(orderId,user_id);
		return new ResponseEntity<>(new MessageDTO("Order Cancelled"),HttpStatus.OK);
	}




	/********************************************************
	 * Get Order Details using Order ID
	 ********************************************************/

	@GetMapping("/{orderId}/{user_id}")
	@CircuitBreaker(name = "GetOrdersDetailsByIDCircuitBreaker", fallbackMethod = "getOrderDetailByIDFallback")
	public ResponseEntity<OrderResponseDTO> getOrderDetails(
//			@RequestHeader("Authorization") String token,
			@PathVariable String orderId, @PathVariable String user_id) {

		log.info("OrderController | getOrderDetails is called");
		log.info("OrderServiceImpl | getOrderDetails | Get order details for Order Id : {} and User Id: {}",orderId, user_id);


//		if (!this.authFeignClient.validate(token).isStatus()) {
//			return new ResponseEntity<>(orderResponseDTO, HttpStatus.UNAUTHORIZED);
//		}

		OrderResponseDTO orderResponseDTO = orderService.getOrderDetails(orderId,user_id);
		log.info("OrderController | getOrderDetails | orderResponse : " + orderResponseDTO.toString());

		return new ResponseEntity<>(orderResponseDTO, HttpStatus.OK);
	}

	/********************************************************
	 * Get All Order Of Particular User
	 ********************************************************/

	@GetMapping("/get-all-order-particular-user/{user_id}")
//	@CircuitBreaker(name = "GetAllOrdersParticularUserCircuitBreaker", fallbackMethod = "getAllOrdersParticularUserFallback")
	public ResponseEntity<List<OrderResponseDTO>> getAllOrdersParticularUser(
//			@RequestHeader("Authorization") String token,
			@RequestParam(name = "year", required = false) Integer year,
			@RequestParam(name = "month", required = false) Integer month,
			@RequestParam(name = "all", required = false) Boolean all,
			@PathVariable("user_id") String user_id) {

		log.info("OrderController | getAllOrdersParticularUser is called");
		log.info("OrderController | getAllOrdersParticularUser is called | year: " + year + " and month: " + month + "and all is : " +all);

//		if (!this.authFeignClient.validate(token).isStatus()) {
//			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//		}

		List<OrderResponseDTO> response;

		if (all != null && all) {
			System.out.println("inside all");
			response = this.orderService.getAllOrderOfParticularUser(user_id);
		} else {
			System.out.println("inside else");
			response = this.orderService.getAllOrderOfParticularUserByYearAndByMonth(user_id,year,month);
		}

		log.info("OrderController | List<OrderResponseDTO> response" + response);

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	/********************************************************
	 * Circuit Breaker Fallback Method
	 ********************************************************/

	private ResponseEntity<List<OrderResponseDTO>> getAllOrdersParticularUserFallback(String user_id, Exception e) {

		log.info("GetAllOrdersParticularUserFallback Executed");

		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	public ResponseEntity<OrderResponseDTO> getOrderDetailByIDFallback(String orderId, Exception e) {

		log.info("GetOrderDetailByIDFallback Method Executed");

		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
