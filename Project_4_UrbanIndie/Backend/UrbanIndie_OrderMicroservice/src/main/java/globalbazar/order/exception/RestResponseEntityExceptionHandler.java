package globalbazar.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import globalbazar.order.responseDTO.ErrorResponseDTO;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    
	@ExceptionHandler(OrderServiceCustomException.class)
    public ResponseEntity<ErrorResponseDTO> handleOrderCustomException(OrderServiceCustomException exception) {
    	
        return new ResponseEntity<>(new ErrorResponseDTO().builder()
                .errorMessage(exception.getMessage())
                .errorCode(exception.getErrorCode())
                .build(),
                HttpStatus.NOT_FOUND);
    }
	
	
	@ExceptionHandler(UserNotAuthorizedCustomException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserCustomException(UserNotAuthorizedCustomException exception) {
    	
        return new ResponseEntity<>(new ErrorResponseDTO().builder()
                .errorMessage(exception.getMessage())
                .errorCode(exception.getErrorCode())
                .build(),
                HttpStatus.UNAUTHORIZED);
    }


}
