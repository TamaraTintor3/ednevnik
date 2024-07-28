package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.UserDTO;
import com.example.ednevnikbackend.models.User;

public interface UserService {

    User getUserById(Integer id);
    User findByUsername(String username);

}
