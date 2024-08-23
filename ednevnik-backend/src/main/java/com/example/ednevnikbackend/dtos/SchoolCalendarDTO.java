package com.example.ednevnikbackend.dtos;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class SchoolCalendarDTO {
    private Integer schoolCalendarId;
    private String description;
    private Date startDate;
    private Date endDate;
}
