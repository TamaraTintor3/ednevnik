package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.EmailData;
import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(EmailData emailData) throws MessagingException;
}
