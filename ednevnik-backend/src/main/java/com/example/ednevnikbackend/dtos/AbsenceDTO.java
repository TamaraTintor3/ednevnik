package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbsenceDTO {
    private Date dateOfAbsence;
    private Integer numberOfClasses;
    private Boolean approved = false;
    private Integer studentId;
}
