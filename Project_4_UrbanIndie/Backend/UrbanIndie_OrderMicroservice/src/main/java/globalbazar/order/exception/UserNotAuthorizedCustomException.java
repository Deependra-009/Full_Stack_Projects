package globalbazar.order.exception;

import lombok.Data;

@Data
public class UserNotAuthorizedCustomException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String errorCode;

    public UserNotAuthorizedCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

}
