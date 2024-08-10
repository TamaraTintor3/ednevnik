package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowUsersDTO {

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String role;

}
