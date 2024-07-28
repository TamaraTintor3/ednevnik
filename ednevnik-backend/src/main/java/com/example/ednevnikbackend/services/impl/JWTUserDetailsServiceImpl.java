package com.example.ednevnikbackend.services.impl;


import com.example.ednevnikbackend.config.JWTUserDetails;
import com.example.ednevnikbackend.daos.UserDAO;
import com.example.ednevnikbackend.services.JWTUserDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JWTUserDetailsServiceImpl implements JWTUserDetailsService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return modelMapper.map(userDAO.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("There is no user with this username!")), JWTUserDetails.class);
    }
}
