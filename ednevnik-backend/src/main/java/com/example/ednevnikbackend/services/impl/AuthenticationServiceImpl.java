package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.daos.UserDAO;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.exceptions.UserAlreadyExistsException;
import com.example.ednevnikbackend.exceptions.WrongCredentialsException;
import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.AuthenticationService;
import com.example.ednevnikbackend.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDAO userDAO;

    @Value("90000")
    private String tokenExpirationTime;

    @Value("${authorization.token.secret}")
    private String tokenSecert;

    @Override
    public JWTUserDetails login(LoginDTO loginDTO) {

        JWTUserDetails jwtUser = null;
        try {
            jwtUser = mapper.map(userService.findByUsername(loginDTO.getUsername()), JWTUserDetails.class);
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtUser, loginDTO.getPassword(), jwtUser.getAuthorities()));
                jwtUser.setToken(generateJWT(jwtUser));
            } catch (Exception ex) {
                throw new WrongCredentialsException();
            }

        } catch (Exception ex) {
            throw new WrongCredentialsException();
        }
        return jwtUser;
    }


    private String generateJWT(JWTUserDetails user) {
        return Jwts.builder().setId(user.getId().toString()).setSubject(user.getUsername()).claim("role", user.getRole().toString()).setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime))).signWith(SignatureAlgorithm.HS512, tokenSecert).compact();
    }

    @Override
    public User registration(RegistrationDto registrationDto) {
        if (userDAO.existsByUsername(registrationDto.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists.");
        }


        User user = mapper.map(registrationDto, User.class);
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));

        try {
            Role role = Role.valueOf(registrationDto.getRole().toUpperCase());
            user.setRole(role.toString());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role provided.");
        }

        return userDAO.save(user);

    }

}
