package com.example.ednevnikbackend.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException() {
        super("Username already exists.");
    }
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
