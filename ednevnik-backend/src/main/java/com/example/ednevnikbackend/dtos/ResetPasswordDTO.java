package com.example.ednevnikbackend.dtos;

import lombok.Data;

@Data
public class ResetPasswordDTO {
    private String username;
    private String token;
    private String newPassword;
}
