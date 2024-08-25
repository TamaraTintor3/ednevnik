package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.daos.ParentDAO;
import com.example.ednevnikbackend.daos.ProfessorDAO;
import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.UserDAO;
import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.exceptions.UserAlreadyExistsException;
import com.example.ednevnikbackend.exceptions.WrongCredentialsException;
import com.example.ednevnikbackend.models.*;
import com.example.ednevnikbackend.services.AuthenticationService;
import com.example.ednevnikbackend.services.EmailService;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.UserService;
import com.fasterxml.uuid.Generators;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
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
@Transactional
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
    SchoolClassDAO schoolClassDAO;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ParentDAO parentDAO;

    @Autowired
    SchoolClassService schoolClassService;

    @Autowired
    private ProfessorDAO professorDAO;

    @Value("900000")
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

        if ("PARENT".equals(savedUser.getRole())) {
            Parent parent = new Parent();
            parent.setUser(savedUser);

            parentDAO.save(parent);
        }else if (Role.PROFESSOR.toString().equals(savedUser.getRole())) {
            Professor professor = new Professor();
            professor.setUser(savedUser);
            professor.setClassProfessor(false);
            professorDAO.save(professor);
        }
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
        UserDTO user=userService.findByUsername(username);

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

    @Override
    public void updateProfessorStatus(Integer userId, Integer schoolClassId) {
        Professor professor = professorDAO.getProfessorByUser_UserId(userId);
        SchoolClass newSchoolClass = schoolClassDAO.findById(schoolClassId)
                .orElseThrow(() -> new IllegalArgumentException("SchoolClass not found with id: " + schoolClassId));

        if (professor != null) {
            SchoolYear currentSchoolYear = schoolClassService.findCurrentSchoolYear();


            if (professor.getSchoolClass() != null) {
                SchoolClass currentClass = professor.getSchoolClass();


                if (currentClass.getSchoolYear().equals(currentSchoolYear)) {

                    if (currentClass.getSchoolClassId().equals(schoolClassId)) {
                        throw new IllegalArgumentException("Professor is already assigned to this class in the current school year.");
                    }

                    throw new IllegalArgumentException("Professor is already assigned to another school class in the current school year.");
                }
            }


            professor.setClassProfessor(true);
            professor.setSchoolClass(newSchoolClass);
            professorDAO.save(professor);
        } else {
            throw new IllegalArgumentException("Professor not found with userId: " + userId);
        }
    }

    @Override
    public Boolean getClassProfessorStatusByUserId(Integer userId) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Professor professor = professorDAO.getProfessorByUser_UserId(user.getUserId());


        return professor.getClassProfessor();
    }
}
