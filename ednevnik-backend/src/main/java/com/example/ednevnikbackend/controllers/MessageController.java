package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.MessageDTO;
import com.example.ednevnikbackend.dtos.MessageRequestDTO;
import com.example.ednevnikbackend.services.MessageService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/parent/{parentId}")
    public List<MessageDTO> getAllParentMessages(@PathVariable Integer parentId){
        return messageService.getAllParentMessages(parentId);
    }

    @GetMapping("/professor/{professorId}")
    public List<MessageDTO> getAllProfessorMessages(@PathVariable Integer professorId){
        return messageService.getAllProfessorMessages(professorId);
    }

    @PostMapping
    public MessageDTO getAllParentMessages(@RequestBody MessageRequestDTO messageRequestDTO){
        return messageService.insertMessage(messageRequestDTO);
    }

    @PostMapping("/opened/{messageId}")
    public MessageDTO setOpened(@PathVariable Integer messageId){
        return  messageService.setOpened(messageId);
    }

    @GetMapping("/{messageId}")
    public MessageDTO getMessageById(@PathVariable Integer messageId){
        return messageService.getMessageById(messageId);
    }
}
