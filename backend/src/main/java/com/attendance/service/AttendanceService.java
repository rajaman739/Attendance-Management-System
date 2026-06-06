package com.attendance.service;

import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import com.attendance.entity.Subject;
import com.attendance.enums.AttendanceStatus;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.StudentRepository;
import com.attendance.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            StudentRepository studentRepository,
            SubjectRepository subjectRepository) {

        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance getAttendanceById(Long id) {

        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with id: " + id));
    }

    public void deleteAttendance(Long id) {

        Attendance attendance =
                getAttendanceById(id);

        attendanceRepository.delete(attendance);
    }

    public Attendance markAttendance(
            Long studentId,
            Long subjectId,
            AttendanceStatus status) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id: " + studentId));

        Subject subject =
                subjectRepository.findById(subjectId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Subject not found with id: " + subjectId));

        Attendance attendance =
                new Attendance();

        attendance.setStudent(student);
        attendance.setSubject(subject);
        attendance.setAttendanceDate(
                LocalDate.now());
        attendance.setStatus(status);

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getStudentAttendance(
            Long studentId) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id: " + studentId));

        return attendanceRepository.findByStudent(student);
    }

    public List<Attendance> getSubjectAttendance(
            Long subjectId) {

        Subject subject =
                subjectRepository.findById(subjectId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Subject not found with id: " + subjectId));

        return attendanceRepository.findBySubject(subject);
    }

    public List<Attendance> getAttendanceByDate(
            LocalDate attendanceDate) {

        return attendanceRepository
                .findByAttendanceDate(attendanceDate);
    }

    public double calculateAttendancePercentage(
            Long studentId) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id: " + studentId));

        long totalClasses =
                attendanceRepository.countByStudent(student);

        if (totalClasses == 0) {
            return 0.0;
        }

        long presentClasses =
                attendanceRepository.countByStudentAndStatus(
                        student,
                        AttendanceStatus.PRESENT);

        return ((double) presentClasses
                / totalClasses) * 100;
    }

    public boolean isLowAttendance(
            Long studentId) {

        return calculateAttendancePercentage(
                studentId) < 75.0;
    }

    // ===================================
    // NEW FEATURE
    // CLASSES NEEDED TO REACH 75%
    // ===================================

    public int classesNeededForSafeAttendance(
            Long studentId) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found with id: " + studentId));

        long totalClasses =
                attendanceRepository.countByStudent(student);

        long presentClasses =
                attendanceRepository.countByStudentAndStatus(
                        student,
                        AttendanceStatus.PRESENT);

        double currentPercentage =
                totalClasses == 0
                        ? 0
                        : ((double) presentClasses
                        / totalClasses) * 100;

        if (currentPercentage >= 75.0) {
            return 0;
        }

        int x = 0;

        while (
                ((double) (presentClasses + x)
                        / (totalClasses + x))
                        * 100 < 75.0
        ) {
            x++;
        }

        return x;
    }
}