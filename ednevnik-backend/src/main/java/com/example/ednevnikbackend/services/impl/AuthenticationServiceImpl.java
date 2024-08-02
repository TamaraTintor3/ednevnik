package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.daos.UserDAO;
import com.example.ednevnikbackend.dtos.EmailData;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.dtos.ResetPasswordDTO;
import com.example.ednevnikbackend.exceptions.UserAlreadyExistsException;
import com.example.ednevnikbackend.exceptions.WrongCredentialsException;
import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.AuthenticationService;
import com.example.ednevnikbackend.services.EmailService;
import com.example.ednevnikbackend.services.UserService;
import com.fasterxml.uuid.Generators;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;


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

    @Autowired
    private EmailService emailService;

    @Value("90000")
    private String tokenExpirationTime;

    @Value("${authorization.token.secret}")
    private String tokenSecert;

    @Value("${frontend.password.change.url}")
    private String url;

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

        User savedUser = userDAO.save(user);

        sendRegistrationEmail(savedUser, registrationDto.getPassword());

        return savedUser;

    }

    private void sendRegistrationEmail(User user, String rawPassword){
        String subject = "Uspješna registracija";
        String content = "<p>Poštovani " + user.getUsername() + ",</p>"
                + "<p>Vaša registracija je uspješno obavljena. Ovdje su Vaši kredencijali:</p>"
                + "<p><b>Korisničko ime:</b> " + user.getUsername() + "</p>"
                + "<p><b>Lozinka:</b> " + rawPassword + "</p>";

        EmailData emailData = new EmailData(user.getEmail(), subject, content);
        try {
            emailService.sendEmail(emailData);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send registration email.", e);
        }
    }

    @Override
    public void forgottenPassword(String username) {
        User user=userService.findByUsername(username);

        String token= Generators.timeBasedGenerator().generate().toString();
        UUID.fromString(token).getMostSignificantBits();

        EmailData emailData=new EmailData(user.getEmail(),"Vraćanje pristupa nalogu","<p>Za promjenu kredencijala naloga sa korisničkim imenom <b>"+user.getUsername()+"</b> kliknite na sljedeći link: <a href='"+url+token+"'>Promjena lozinke</a></p>");
        try {
            emailService.sendEmail(emailData);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        userService.setUserToken(user.getUserId(),token);
    }

    @Override
    public boolean updatePassword(ResetPasswordDTO resetPasswordDTO) {
        User user=userService.findByToken(resetPasswordDTO.getToken());
        long tokenTimestamp=UUID.fromString(resetPasswordDTO.getToken()).timestamp()/ 10000L - 12219292800000L;
        if(resetPasswordDTO.getToken().equals(user.getToken()) && new Timestamp(System.currentTimeMillis()).before(new Timestamp(tokenTimestamp+20*60*1000))){
            userService.updateUserPassword(user.getUserId(),passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
            userService.removeUserToken(user.getUserId());
            return true;
        }
        return false;
    }
}
