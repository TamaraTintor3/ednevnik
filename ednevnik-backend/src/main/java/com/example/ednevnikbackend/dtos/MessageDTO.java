package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.models.Professor;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Date;

@Data
public class MessageDTO {
    private Integer messageId;
    private String title;
    private String text;
    private Date date;
    private boolean isOpened;
    private String sender;
    private String parentUserFirstName;
    private String parentUserLastName;
    private String parentId;
    private String professorUserFirstName;
    private String professorUserLastName;
    private String professorId;
}
