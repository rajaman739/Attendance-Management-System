package com.attendance.controller;

import com.attendance.entity.AttendancePrediction;
import com.attendance.service.AttendancePredictionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "*")
public class AttendancePredictionController {

    private final AttendancePredictionService attendancePredictionService;

    public AttendancePredictionController(
            AttendancePredictionService attendancePredictionService) {

        this.attendancePredictionService =
                attendancePredictionService;
    }

    // GET ALL PREDICTIONS
    @GetMapping
    public List<AttendancePrediction> getAllPredictions() {

        return attendancePredictionService
                .getAllPredictions();
    }

    // GET PREDICTIONS BY STUDENT
    @GetMapping("/student/{studentId}")
    public List<AttendancePrediction> getPredictionsByStudent(
            @PathVariable Long studentId) {

        return attendancePredictionService
                .getPredictionsByStudent(studentId);
    }

    // GENERATE FOR ONE STUDENT
    @PostMapping("/generate/{studentId}")
    public AttendancePrediction generatePrediction(
            @PathVariable Long studentId) {

        return attendancePredictionService
                .generatePrediction(studentId);
    }

    // GENERATE FOR ALL STUDENTS
    @PostMapping("/generate-all")
    public String generateAllPredictions() {

        attendancePredictionService
                .generateAllPredictions();

        return "Predictions generated for all students";
    }

    // CREATE MANUALLY
    @PostMapping
    public AttendancePrediction createPrediction(
            @RequestBody AttendancePrediction prediction) {

        return attendancePredictionService
                .savePrediction(prediction);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deletePrediction(
            @PathVariable Long id) {

        attendancePredictionService
                .deletePrediction(id);

        return "Prediction deleted successfully";
    }
}