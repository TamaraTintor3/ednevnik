package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "message", schema = "public", catalog = "ednevnik")
public class Message {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "message_id")
    private Integer messageId;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "text")
    private String text;
    @Basic
    @Column(name = "date")
    private Date date;
    @Basic
    @Column(name = "is_opened")
    private boolean isOpened;
    @Basic
    @Column(name = "sender")
    private String sender;
    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "parent_id", nullable = false)
    private Parent parent;
    @ManyToOne
    @JoinColumn(name = "professor_id", referencedColumnName = "professor_id", nullable = false)
    private Professor professor;
}
