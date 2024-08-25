package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.SchoolClass;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class TeachingDTO {

    private int teachingId;

    private int professorId;

    private Integer schoolClassId;
}
