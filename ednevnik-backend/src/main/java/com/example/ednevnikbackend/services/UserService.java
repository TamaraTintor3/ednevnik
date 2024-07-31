package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.models.User;

public interface UserService {

    User getUserById(Integer id);
    User findByUsername(String username);
    User setUserToken(Integer id,String token);
    User removeUserToken(Integer id);
    User updateUserPassword(Integer id, String password);
}
