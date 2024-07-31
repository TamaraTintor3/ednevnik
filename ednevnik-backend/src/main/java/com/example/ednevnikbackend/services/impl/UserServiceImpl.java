package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.UserDAO;
import com.example.ednevnikbackend.dtos.UserDTO;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User getUserById(Integer id) {
        return userDAO.findByUserId(id);
    }

    @Override
    public User findByUsername(String username) {
        return modelMapper.map(userDAO.findByUsername(username),User.class);
    }

    @Override
    public User setUserToken(Integer id,String token) {
        User user=modelMapper.map(userDAO.findByUserId(id),User.class);
        user.setToken(token);
        user=userDAO.saveAndFlush(user);
        return user;
    }

    @Override
    public User removeUserToken(Integer id) {
        User user=modelMapper.map(userDAO.findByUserId(id),User.class);
        user.setToken(null);
        user=userDAO.saveAndFlush(user);
        return user;
    }

    @Override
    public User updateUserPassword(Integer id,String password) {
        User user=userDAO.findByUserId(id);
        user.setPassword(password);
        user=userDAO.saveAndFlush(user);
        return user;
    }
}
