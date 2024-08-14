package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParentDTO {
    private Integer parentId;
    private String firstName;
    private String lastName;
}
