package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.MessageDTO;
import com.example.ednevnikbackend.dtos.MessageRequestDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getAllParentMessages(Integer parentId);
    List<MessageDTO> getAllProfessorMessages(Integer professorId);
    MessageDTO insertMessage(MessageRequestDTO messageRequestDTO);
    MessageDTO setOpened(Integer messageId);

    MessageDTO getMessageById(Integer messageId);
}
