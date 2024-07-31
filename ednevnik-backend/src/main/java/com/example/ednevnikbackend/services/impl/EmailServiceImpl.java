package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.dtos.EmailData;
import com.example.ednevnikbackend.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(EmailData emailData) throws MessagingException {
        MimeMessage message =javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message,true);

        helper.setSubject(emailData.getSubject());
        helper.setTo(emailData.getTo());
        helper.setText(emailData.getBody(),true);
        javaMailSender.send(message);
    }

}
