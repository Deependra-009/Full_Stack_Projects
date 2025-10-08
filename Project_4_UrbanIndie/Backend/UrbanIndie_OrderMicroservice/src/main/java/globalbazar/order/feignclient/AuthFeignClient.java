package globalbazar.order.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import globalbazar.order.responseDTO.ValidatingDTO;




@FeignClient(url="http://localhost:8082/user-authentication/",name="USER-SERVICE")
public interface AuthFeignClient {
	
	@GetMapping("/validate")
	 ValidatingDTO validate(@RequestHeader("Authorization") String token);

}
