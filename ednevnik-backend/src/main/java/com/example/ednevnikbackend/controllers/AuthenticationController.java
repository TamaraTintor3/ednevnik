package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
