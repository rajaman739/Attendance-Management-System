package com.attendance.controller;

import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.FacultyRepository;
import com.attendance.repository.StudentRepository;
import com.attendance.repository.SubjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://attendance-management-system-pink.vercel.app"
})
public class DashboardController {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final SubjectRepository subjectRepository;
    private final AttendanceRepository attendanceRepository;

    public DashboardController(
            StudentRepository studentRepository,
            FacultyRepository facultyRepository,
            SubjectRepository subjectRepository,
            AttendanceRepository attendanceRepository) {

        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.subjectRepository = subjectRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping
    public Map<String, Object> getDashboardData() {

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put(
                "totalStudents",
                studentRepository.count());

        dashboard.put(
                "totalFaculty",
                facultyRepository.count());

        dashboard.put(
                "totalSubjects",
                subjectRepository.count());

        dashboard.put(
                "totalAttendanceRecords",
                attendanceRepository.count());

        return dashboard;
    }
}