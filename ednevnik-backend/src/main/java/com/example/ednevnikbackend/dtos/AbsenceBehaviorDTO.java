package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Absence;
import lombok.Data;

import java.util.List;

@Data
public class AbsenceBehaviorDTO {
    private List<AbsenceDTO> absences;
    private String behavior;
}
