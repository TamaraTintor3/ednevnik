package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.MessageDAO;
import com.example.ednevnikbackend.dtos.MessageDTO;
import com.example.ednevnikbackend.dtos.MessageRequestDTO;
import com.example.ednevnikbackend.exceptions.NotFoundException;
import com.example.ednevnikbackend.models.Message;
import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.models.Professor;
import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.services.MessageService;
import com.example.ednevnikbackend.services.ParentService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageDAO messageDAO;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MessageDTO> getAllParentMessages(Integer parentId) {
        return messageDAO.findAllByParent_ParentId(parentId).stream().filter((message)->message.getSender().equals(Role.PROFESSOR.toString())).sorted(Comparator.comparing(Message::getDate).reversed()).map((message)->modelMapper.map(message,MessageDTO.class)).toList();
    }

    @Override
    public List<MessageDTO> getAllProfessorMessages(Integer professorId) {
        return messageDAO.findAllByProfessor_ProfessorId(professorId).stream().filter((message)->message.getSender().equals(Role.PARENT.toString())).sorted(Comparator.comparing(Message::getDate).reversed()).map((message)->modelMapper.map(message,MessageDTO.class)).toList();
    }

    @Override
    public MessageDTO insertMessage(MessageRequestDTO messageRequestDTO) {
        Message message=modelMapper.map(messageRequestDTO,Message.class);
        message.setMessageId(null);
        Parent parent=new Parent();
        parent.setParentId(messageRequestDTO.getParentId());
        message.setParent(parent);
        Professor professor=new Professor();
        professor.setProfessorId(messageRequestDTO.getProfessorId());
        message.setProfessor(professor);
        message=messageDAO.saveAndFlush(message);
        entityManager.refresh(message);
        return modelMapper.map(message,MessageDTO.class);
    }

    @Override
    public MessageDTO setOpened(Integer messageId) {
        Message message=messageDAO.findById(messageId).orElseThrow(NotFoundException::new);
        message.setMessageId(messageId);
        message.setOpened(true);
        message=messageDAO.saveAndFlush(message);
        entityManager.refresh(message);
        return modelMapper.map(message,MessageDTO.class);
    }

    @Override
    public MessageDTO getMessageById(Integer messageId) {
        return modelMapper.map(messageDAO.findById(messageId),MessageDTO.class);
    }
}
