package globalbazar.order.services.impl;

import globalbazar.order.ConstantData;
import globalbazar.order.entities.OrderEntity;
import globalbazar.order.entities.PaymentRequest;
import globalbazar.order.exception.OrderServiceCustomException;
import globalbazar.order.feignclient.PaymentServiceFeignClient;
import globalbazar.order.repository.OrderRepository;
import globalbazar.order.requestDTO.OrderRequestDTO;
import globalbazar.order.requestDTO.OrderedProductsList;
import globalbazar.order.responseDTO.OrderResponseDTO;
import globalbazar.order.responseDTO.PaymentResponse;
import globalbazar.order.responseDTO.ProductResponseDTO;
import globalbazar.order.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.math.BigDecimal;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final RestTemplate restTemplate;
    private final PaymentServiceFeignClient paymentService;


    @Override
    public OrderResponseDTO placeOrder(OrderRequestDTO orderRequest) {
        log.info("OrderServiceImpl | placeOrder is called");
        log.info("OrderServiceImpl | placeOrder | Placing Order Request orderRequest : " + orderRequest.toString());
        // Step 1: Generate Order ID
        String randomOrderID = generateUniqueOrderID();

        // Step 2: Send Payment Details to Payment Microservice
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setOrderId(randomOrderID);
        paymentRequest.setAmount(orderRequest.getOrder_total_amount());
        paymentRequest.setPaymentMode(orderRequest.getPayment_mode());

        String paymentStatus;

        log.info("OrderServiceImpl | placeOrder | Calling Payment Service to complete the payment");
        try {
            // Calling the Feign client to collect payment
            PaymentResponse paymentResponse = paymentService.collectPayment(paymentRequest);

            if (paymentResponse == null || !paymentResponse.getPaymentStatus().equals("SUCCESS")) {
                log.error("OrderServiceImpl | placeOrder | Payment failed. Changing order status to PAYMENT_FAILED");
                paymentStatus = "PAYMENT_FAILED";
            } else {
                paymentStatus = "PLACED";
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl | placeOrder | Exception occurred during payment: " + e.getMessage());
            paymentStatus = "PAYMENT_FAILED";
        }

        // Calculate the total order amount by summing up product prices
        BigDecimal totalOrderAmount = orderRequest.getOrder_products().stream()
                .map(orderedProduct -> new BigDecimal(orderedProduct.getProduct_price()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Initialize order entity
        OrderEntity order = OrderEntity.builder()
                .user_id(orderRequest.getUser_id())
                .order_id(randomOrderID)
                .order_status("Placed")
                .payment_status(paymentStatus)
                .order_total_amount(totalOrderAmount.toString())
                .addressOfDelivery(orderRequest.getAddress())
                .products(orderRequest.getOrder_products())
                .order_date(Instant.now())
                .paymentMethodSelected(orderRequest.getPayment_mode())
                .build();

        order = orderRepository.save(order);

        log.info("OrderServiceImpl | placeOrder | Order Places successfully with Order Id: {}", order.getOrder_id());

        return changeEntityToResponse(order);
    }

    /*****************************
     * Generating unique order id
     *******************************/
    public String generateUniqueOrderID() {
        String orderPrefix = "URBAN-ORD";
        String uuidPart = UUID.randomUUID().toString().replace("-", "");
        String timestamp = Instant.now().toString().replace("-", "").replace(":", "").replace(".", "");
        String randomDigits = String.format("%04d", new Random().nextInt(10000));
        return orderPrefix + uuidPart + timestamp + randomDigits;
    }

    /*****************************
     * Get Order Details
     *******************************/
    @Override
    public OrderResponseDTO getOrderDetails(String order_Id, String user_id) {
        log.info("OrderServiceImpl | getOrderDetails | Get order details for Order Id : {} and User Id: {}", order_Id, user_id);
        OrderEntity order = orderRepository.findOrderByOrder_idAndUser_id(order_Id, user_id)
                .orElseThrow(() -> new OrderServiceCustomException("Order not found for the order Id:" + order_Id, "NOT_FOUND"));

        log.info("OrderServiceImpl | getOrderDetails | Invoking Product service to fetch product details");


        OrderResponseDTO response = changeEntityToResponse(order);
        log.info("OrderServiceImpl | getOrderDetails | orderResponse : " + response);

        return response;

    }


    /*****************************
     * Cancel
     *******************************/
    @Override
    public void cancelOrder(String order_Id, String user_id) {
        log.info("OrderServiceImpl | cancelOrder | cancel order for Order Id : {} and User Id: {}", order_Id, user_id);
        OrderEntity order = orderRepository.findOrderByOrder_idAndUser_id(order_Id, user_id)
                .orElseThrow(() -> new OrderServiceCustomException("Order not found for the order Id:" + order_Id, "NOT_FOUND"));
        order.setOrder_status("Cancelled");
        orderRepository.save(order);
    }


    /***********************************************
     * Get All Orders Details of Particular User
     ***********************************************/

    @Override
    public List<OrderResponseDTO> getAllOrderOfParticularUser(String user_id) {
        log.info("OrderServiceImpl | getAllOrderOfParticularUser |  User Id: {}", user_id);
        List<OrderEntity> orders = orderRepository.findAllOrderParticularUser(user_id);
        return processOrders(orders);
    }

    /***********************************************
     * Get All Orders Details of Particular User By Year Month,
     * if No year or month is passed orders of last 3 months will be sent in response
     * if only year is passed else-if will come into the picture
     * if month is passed along with the year then else will come into the picture
     ***********************************************/
    @Override
    public List<OrderResponseDTO> getAllOrderOfParticularUserByYearAndByMonth(String user_id, Integer year, Integer month) {
        Instant currentDate = Instant.now();
        List<OrderEntity> orders;
        if (year == null && month == null) {
            YearMonth currentYearMonth = YearMonth.now();
            YearMonth threeMonthsAgo = currentYearMonth.minusMonths(3);
            orders = orderRepository.findOrdersByUserIdAndDateRange(user_id, threeMonthsAgo.atDay(1)
                    .atStartOfDay(ZoneOffset.UTC).toInstant(), currentDate
            );
        }
        //when year is present but month is null
        else if (year != null && month == null && year != 0) {
            // Start of the year
            LocalDate startDate = LocalDate.of(year, 1, 1);
            Instant startInstant = startDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
            // End of the year
            LocalDate endDate = LocalDate.of(year, 12, 31);
            Instant endInstant = endDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();
            orders = orderRepository.findOrdersByUserIdAndDateRange(user_id, startInstant, endInstant);
            System.out.println("Yearly orders: " + orders.toString());
        }
        else {
            // Start of the month
            YearMonth yearMonth = YearMonth.of(year, month);
            Instant startInstant = yearMonth.atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
            // End of the month
            Instant endInstant = yearMonth.atEndOfMonth().atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant();

            orders = orderRepository.findOrdersByUserIdAndDateRange(user_id, startInstant, endInstant);
            System.out.println("Monthly orders: " + orders.toString());
        }

        return processOrders(orders);

    }


    /***********************************************
     * Transfer OrderEntity -> OrderResponseDTO
     ***********************************************/

    private OrderResponseDTO changeEntityToResponse(OrderEntity order) {
//        System.out.println("order ka address"+order.getAddressOfDelivery().toString());
        return OrderResponseDTO.builder()
                .order_id(order.getOrder_id())
                .user_id(order.getUser_id())
                .order_total_amount(order.getOrder_total_amount())
                .order_status(order.getOrder_status())
                .products(fetchProductData(order.getProducts(), order.getOrder_date()))
                .payment_mode(order.getPaymentMethodSelected())
                .order_date(order.getOrder_date())
                .addressOfDelivery(order.getAddressOfDelivery())
                .build();
    }

    public List<OrderResponseDTO> processOrders(List<OrderEntity> orders) {
        List<OrderResponseDTO> orderResponseList = new ArrayList<>();

        for (OrderEntity order : orders) {
            Instant orderDate = order.getOrder_date();
            long secondsDifference = ChronoUnit.SECONDS.between(orderDate, Instant.now());

            if (secondsDifference >= 216000) {
                // If the order is more than 2.5 days old and its status is not "Delivered"
                if (!"Delivered".equals(order.getOrder_status())) {
                    order.setOrder_status("Delivered");
                    orderRepository.save(order);
                }
            }

            OrderResponseDTO orderResponse = changeEntityToResponse(order);
            orderResponseList.add(orderResponse);
        }

        return orderResponseList;
    }


    /***********************************************
     * Fetch Product data from Product Microservice
     ***********************************************/

    private List<ProductResponseDTO> fetchProductData(List<OrderedProductsList> orderedProductsList, Instant order_date) {
        List<CompletableFuture<ProductResponseDTO>> futures = orderedProductsList.stream()
                .map(orderedProduct -> CompletableFuture.supplyAsync(() -> {
                    String productURL = ConstantData.PRODUCT_MICROSERVICE_URL + orderedProduct.getProduct_id();
                    ResponseEntity<ProductResponseDTO> response = restTemplate.getForEntity(productURL, ProductResponseDTO.class);
                    if (response.getStatusCode() == HttpStatus.OK) {
                        ProductResponseDTO product = response.getBody();
                        product.setProduct_quantity(orderedProduct.getProduct_quantity());
                        product.setProduct_price(orderedProduct.getProduct_price());
                        product.setProduct_discount(orderedProduct.getProduct_discount());
                        product.setSelectedProductSize(orderedProduct.getProduct_size());
                        product.setSelectedProductColour(orderedProduct.getProduct_colour());
                        String formattedDeliveryDate = formatDeliveryDate(order_date);
                        product.setDeliveryDate(formattedDeliveryDate);
                        return product;
                    } else {
                        return null;
                    }
                }))
                .toList();

        return futures.stream()
                .map(CompletableFuture::join) // Wait for CompletableFuture to complete
                .filter(Objects::nonNull)     // Filter out null results
                .collect(Collectors.toList()); // Collect the results into a list
    }

    private String formatDeliveryDate(Instant orderDate) {
        Instant calculatedOrderDate = orderDate.plus(2, ChronoUnit.DAYS);
        LocalDate deliveryDate = calculatedOrderDate.atZone(ZoneId.systemDefault()).toLocalDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM");
        return deliveryDate.format(formatter);
    }

}
