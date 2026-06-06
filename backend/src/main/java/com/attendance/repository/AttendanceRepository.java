package com.attendance.repository;

import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import com.attendance.entity.Subject;
import com.attendance.enums.AttendanceStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudent(Student student);

    List<Attendance> findBySubject(Subject subject);

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    List<Attendance> findByStudentAndSubject(
            Student student,
            Subject subject
    );

    long countByStudent(Student student);

    long countByStudentAndStatus(
            Student student,
            AttendanceStatus status
    );
}