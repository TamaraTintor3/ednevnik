package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ShowUsersDTO;
import com.example.ednevnikbackend.dtos.UserDTO;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;


    @GetMapping("/showAll")
    public ResponseEntity<List<ShowUsersDTO>> getAllUsers() {
        List<ShowUsersDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }



    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {

        UserDTO user = userService.findByUsername(username);
        System.out.println(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/editUserById/{id}")
    public ResponseEntity<?> editUserById(@PathVariable Integer id, @RequestBody UserDTO user){

        User u = userService.editUser(id,user);
        return ResponseEntity.ok(user);
    }
}
