package globalbazar.order.services;

import java.util.List;

import globalbazar.order.requestDTO.OrderRequestDTO;
import globalbazar.order.responseDTO.OrderResponseDTO;

public interface OrderService {
    // add orders
    OrderResponseDTO placeOrder(OrderRequestDTO orderRequest);

    //get order
    OrderResponseDTO getOrderDetails(String orderId,String user_id);
    
    List<OrderResponseDTO> getAllOrderOfParticularUser(String user_id);
    List<OrderResponseDTO> getAllOrderOfParticularUserByYearAndByMonth(String user_id,Integer year,Integer month);
    void cancelOrder(String orderId,String user_id);
}
