package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ShowUsersDTO;
import com.example.ednevnikbackend.dtos.UserDTO;
import com.example.ednevnikbackend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    User getUserById(Integer id);
    UserDTO findByUsername(String username);
    User setUserToken(Integer id,String token);
    User removeUserToken(Integer id);
    User updateUserPassword(Integer id, String password);
    User findByToken(String token);
    List<ShowUsersDTO> getAllUsers();
    User editUser (Integer id, UserDTO userDTO);
}
