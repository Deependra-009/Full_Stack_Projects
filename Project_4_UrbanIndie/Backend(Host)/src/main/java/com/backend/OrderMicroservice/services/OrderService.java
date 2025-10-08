package com.backend.OrderMicroservice.services;


import com.backend.OrderMicroservice.requestDTO.OrderRequestDTO;
import com.backend.OrderMicroservice.responseDTO.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    // add orders
    OrderResponseDTO placeOrder(OrderRequestDTO orderRequest);

    //get order
    OrderResponseDTO getOrderDetails(String orderId,String user_id);
    
    List<OrderResponseDTO> getAllOrderOfParticularUser(String user_id);
    List<OrderResponseDTO> getAllOrderOfParticularUserByYearAndByMonth(String user_id,Integer year,Integer month);
    void cancelOrder(String orderId,String user_id);
}
