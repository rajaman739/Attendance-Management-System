package com.attendance.controller;

import com.attendance.dto.AttendanceRequest;
import com.attendance.entity.Attendance;
import com.attendance.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    @PostMapping
    public Attendance createAttendance(
            @RequestBody AttendanceRequest request) {

        return attendanceService.markAttendance(
                request.getStudentId(),
                request.getSubjectId(),
                request.getStatus());
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {

        return attendanceService.getAllAttendance();
    }

    @DeleteMapping("/{id}")
    public String deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return "Attendance deleted successfully";
    }

    @GetMapping("/student/{studentId}")
    public List<Attendance> getStudentAttendance(
            @PathVariable Long studentId) {

        return attendanceService
                .getStudentAttendance(studentId);
    }

    @GetMapping("/subject/{subjectId}")
    public List<Attendance> getSubjectAttendance(
            @PathVariable Long subjectId) {

        return attendanceService
                .getSubjectAttendance(subjectId);
    }

    @GetMapping("/percentage/{studentId}")
    public double getAttendancePercentage(
            @PathVariable Long studentId) {

        return attendanceService
                .calculateAttendancePercentage(studentId);
    }

    @GetMapping("/low/{studentId}")
    public boolean isLowAttendance(
            @PathVariable Long studentId) {

        return attendanceService
                .isLowAttendance(studentId);
    }

    // ============================
    // NEW ENDPOINT
    // ============================

    @GetMapping("/required/{studentId}")
    public int classesNeeded(
            @PathVariable Long studentId) {

        return attendanceService
                .classesNeededForSafeAttendance(
                        studentId);
    }
}