package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.SubjectGrades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentDAO extends JpaRepository<Student, Integer> {
    List<Student> findBySchoolClassSchoolClassId(Integer schoolClassId);

    boolean existsByJmbg(String jmbg);

    Student findByStudentId(Integer id);

    Student findByParent_ParentId(Integer parentId);
    List<Student> findAllByParent_ParentId(Integer parentId);


}
