package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.sql.Date;

@Data
public class MessageRequestDTO {
    private String title;
    private String text;
    private Date date;
    private boolean isOpened;
    private String sender;
    private Integer parentId;
    private Integer professorId;
}
