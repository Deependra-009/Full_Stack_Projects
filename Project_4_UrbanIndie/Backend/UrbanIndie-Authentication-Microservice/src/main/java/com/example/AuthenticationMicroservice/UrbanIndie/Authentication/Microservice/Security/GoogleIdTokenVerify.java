package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Security;

import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.DTO.RequestDTO;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleIdTokenVerify {

    public GoogleIdToken authorize(RequestDTO requestDTO){

        String CLIENT_ID=requestDTO.getClientId();
        String token=requestDTO.getToken();

        try{
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    // Or, if multiple clients access the backend:
                    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            System.out.println("idToken: "+idToken);
            if (idToken != null) {
                // Use or store profile information
                return idToken;

            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return null;

    }

    private void getUserDetails(GoogleIdToken idToken){
        GoogleIdToken.Payload payload = idToken.getPayload();
        // Print user identifier
        String userId = payload.getSubject();
        System.out.println("User ID: " + userId);

        // Get profile information from payload
        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");

        System.out.println(email);
        System.out.println(emailVerified);
        System.out.println(pictureUrl);
        System.out.println(locale);
        System.out.println(familyName);
        System.out.println(givenName);


    }

}
