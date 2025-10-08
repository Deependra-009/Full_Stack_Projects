package com.backend.OrderMicroservice.responseDTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class ValidatingDTO {
	
	private boolean status;
	String email;
}

