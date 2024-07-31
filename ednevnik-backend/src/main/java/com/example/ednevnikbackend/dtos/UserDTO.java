package com.example.ednevnikbackend.dtos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer userId;

    private String firstName;

    private String lastName;

    private String username;

    private String password;

    private String email;

    private String role;

    private String token;
}
