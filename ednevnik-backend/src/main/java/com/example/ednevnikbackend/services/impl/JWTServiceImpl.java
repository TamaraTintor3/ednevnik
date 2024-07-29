package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.services.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.function.Function;

@Service
public class JWTServiceImpl implements JWTService {

    @Value("${authorization.token.secret}")
    private String secretKey;
    @Override
    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public Boolean isTokenValid(String token, JWTUserDetails user) {
        String username = extractClaim(token, Claims::getSubject);
        return (user.getUsername().equals(username) && !isTokenExpired(token));
    }

    @Override
    public Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
