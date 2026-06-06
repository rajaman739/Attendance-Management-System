package com.attendance.dto;

import com.attendance.enums.AttendanceStatus;
import lombok.Data;

@Data
public class AttendanceRequest {

    private Long studentId;
    private Long subjectId;
    private AttendanceStatus status;
}