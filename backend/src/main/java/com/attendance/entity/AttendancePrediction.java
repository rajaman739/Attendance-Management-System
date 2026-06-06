package com.attendance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.attendance.enums.RiskLevel;

import java.time.LocalDateTime;

@Entity
@Table(name = "attendance_prediction")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendancePrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "predicted_percentage")
    private Double predictedPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level")
    private RiskLevel riskLevel;

    @Column(name = "prediction_date")
    private LocalDateTime predictionDate;
}