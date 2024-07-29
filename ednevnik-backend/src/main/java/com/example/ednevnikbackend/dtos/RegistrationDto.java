package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDto {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String role;
}
