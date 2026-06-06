package com.attendance.service;

import com.attendance.entity.AttendancePrediction;
import com.attendance.entity.Student;
import com.attendance.enums.RiskLevel;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.AttendancePredictionRepository;
import com.attendance.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendancePredictionService {

    private final AttendancePredictionRepository attendancePredictionRepository;
    private final StudentRepository studentRepository;
    private final AttendanceService attendanceService;

    public AttendancePredictionService(
            AttendancePredictionRepository attendancePredictionRepository,
            StudentRepository studentRepository,
            AttendanceService attendanceService) {

        this.attendancePredictionRepository = attendancePredictionRepository;
        this.studentRepository = studentRepository;
        this.attendanceService = attendanceService;
    }

    // GET ALL PREDICTIONS
    public List<AttendancePrediction> getAllPredictions() {

        return attendancePredictionRepository.findAll();
    }

    // SAVE PREDICTION
    public AttendancePrediction savePrediction(
            AttendancePrediction prediction) {

        return attendancePredictionRepository.save(prediction);
    }

    // GET PREDICTIONS OF SINGLE STUDENT
    public List<AttendancePrediction> getPredictionsByStudent(
            Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: "
                                        + studentId));

        return attendancePredictionRepository.findByStudent(student);
    }

    // DELETE PREDICTION
    public void deletePrediction(Long id) {

        attendancePredictionRepository.deleteById(id);
    }

    // GENERATE PREDICTION FOR ONE STUDENT
    @Transactional
    public AttendancePrediction generatePrediction(
            Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: "
                                        + studentId));

        double attendancePercentage =
                attendanceService
                        .calculateAttendancePercentage(studentId);

        RiskLevel riskLevel;

        if (attendancePercentage >= 75) {

            riskLevel = RiskLevel.LOW;

        } else if (attendancePercentage >= 60) {

            riskLevel = RiskLevel.MEDIUM;

        } else {

            riskLevel = RiskLevel.HIGH;
        }

        // DELETE OLD PREDICTIONS OF THIS STUDENT

        List<AttendancePrediction> oldPredictions =
                attendancePredictionRepository
                        .findByStudent(student);

        attendancePredictionRepository
                .deleteAll(oldPredictions);

        AttendancePrediction prediction =
                new AttendancePrediction();

        prediction.setStudent(student);
        prediction.setPredictedPercentage(
                attendancePercentage);

        prediction.setRiskLevel(riskLevel);

        prediction.setPredictionDate(
                LocalDateTime.now());

        return attendancePredictionRepository
                .save(prediction);
    }

    // GENERATE PREDICTIONS FOR ALL STUDENTS
    @Transactional
    public void generateAllPredictions() {

        List<Student> students =
                studentRepository.findAll();

        for (Student student : students) {

            generatePrediction(student.getId());
        }
    }
}