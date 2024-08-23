package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.sql.Date;

@Data
public class NewSchoolCalendarEventDTO {
    private String description;
    private Date startDate;
    private Date endDate;
    private Integer professorId;
}
