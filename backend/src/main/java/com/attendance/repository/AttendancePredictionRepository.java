package com.attendance.repository;

import com.attendance.entity.AttendancePrediction;
import com.attendance.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendancePredictionRepository
        extends JpaRepository<AttendancePrediction, Long> {

    List<AttendancePrediction> findByStudent(Student student);

}