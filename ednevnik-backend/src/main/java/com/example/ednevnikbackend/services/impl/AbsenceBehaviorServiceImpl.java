package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.dtos.AbsenceBehaviorDTO;
import com.example.ednevnikbackend.models.StudentClass;
import com.example.ednevnikbackend.services.AbsenceBehaviorService;
import com.example.ednevnikbackend.services.AbsenceService;
import com.example.ednevnikbackend.services.StudentClassService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AbsenceBehaviorServiceImpl implements AbsenceBehaviorService {
    @Autowired
    private AbsenceService absenceService;
    @Autowired
    private StudentClassService studentClassService;
    @Override
    public AbsenceBehaviorDTO getDataForParent(Integer parentId) {
        AbsenceBehaviorDTO absenceBehaviorDTO=new AbsenceBehaviorDTO();
        absenceBehaviorDTO.setAbsences(absenceService.getAbsencesForParent(parentId));
        StudentClass studentClass=studentClassService.getByParentIdAndSchoolYearId(parentId);
        if(studentClass!=null) {
            absenceBehaviorDTO.setBehavior(studentClassService.getByParentIdAndSchoolYearId(parentId).getBehavior());
        }
        return absenceBehaviorDTO;
    }
}
