package com.example.ednevnikbackend;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EdnevnikBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EdnevnikBackendApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper(){

        ModelMapper mapper=new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
        return mapper;
    }
}
