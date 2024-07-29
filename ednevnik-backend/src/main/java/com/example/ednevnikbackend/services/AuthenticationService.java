package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface AuthenticationService {

    public JWTUserDetails login(LoginDTO loginDTO);
    public User registration(RegistrationDto registrationDto);
}
