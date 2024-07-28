package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.config.JWTUserDetails;
import io.jsonwebtoken.Claims;

import java.util.function.Function;

public interface JWTService {

    Claims extractAllClaims(String token);


    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    Boolean isTokenValid(String token, JWTUserDetails user);

    Boolean isTokenExpired(String token);

}
