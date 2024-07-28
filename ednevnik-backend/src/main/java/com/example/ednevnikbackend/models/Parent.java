package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "parent", schema = "public", catalog = "ednevnik")
public class Parent {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "parent_id")
    private Integer parentId;
    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    private List<Message> messages;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;
    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    private List<Student> students;
}
