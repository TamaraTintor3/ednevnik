package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.dtos.LoginDTO;
import com.example.ednevnikbackend.dtos.RegistrationDto;
import com.example.ednevnikbackend.dtos.ResetPasswordDTO;
import com.example.ednevnikbackend.models.User;
import jakarta.mail.MessagingException;

public interface AuthenticationService {

    public JWTUserDetails login(LoginDTO loginDTO);
    public User registration(RegistrationDto registrationDto);
    void forgottenPassword(String username) throws MessagingException;
    boolean updatePassword(ResetPasswordDTO resetPasswordDTO);
    void updateProfessorStatus(Integer userId, boolean classProfessor);
    Boolean getClassProfessorStatusByUserId(Integer userId);
}
