package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.dtos.ResetPasswordDTO;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.AuthenticationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {


    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<JWTUserDetails> login(@RequestBody LoginDTO loginDTO) {

        JWTUserDetails user = authenticationService.login(loginDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);


    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto registrationDto) {
        User user = authenticationService.registration(registrationDto);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/reset-password-request/{username}")
    public ResponseEntity<String> resetPassword(@PathVariable String username){

        try {
            authenticationService.forgottenPassword(username);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Email with reset link is sent!");
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ResetPasswordDTO resetPasswordDTO){
        boolean status=authenticationService.updatePassword(resetPasswordDTO);
        if(status)
            return ResponseEntity.ok("Password updated!");
        return new ResponseEntity<>("Password not updated!",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
