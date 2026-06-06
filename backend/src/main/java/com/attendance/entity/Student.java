package com.attendance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "roll_no", nullable = false, unique = true)
    private String rollNo;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String department;

    private Integer semester;

    @Column(name = "face_image")
    private String faceImage;
}