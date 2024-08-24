package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AbsenceBehaviorDTO;

public interface AbsenceBehaviorService {
    AbsenceBehaviorDTO getDataForParent(Integer parentId);
}
