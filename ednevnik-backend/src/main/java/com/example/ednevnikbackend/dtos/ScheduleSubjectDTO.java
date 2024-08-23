package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleSubjectDTO {
    private Integer subjectOrder;
    private String day;
    private Integer subjectId;
    private Integer classScheduleId;
}
