package com.attendance.controller;

import com.attendance.entity.Attendance;
import com.attendance.service.AttendanceService;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://attendance-management-system-pink.vercel.app"
})
public class ReportController {

    private final AttendanceService attendanceService;

    public ReportController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    // PDF REPORT

    @GetMapping("/attendance/pdf")
    public ResponseEntity<byte[]> exportAttendancePdf() {

        try {

            List<Attendance> attendanceList =
                    attendanceService.getAllAttendance();

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            Document document =
                    new Document();

            PdfWriter.getInstance(
                    document,
                    out
            );

            document.open();

            document.add(
                    new Paragraph(
                            "Attendance Management System"
                    )
            );

            document.add(
                    new Paragraph(
                            "Attendance Report"
                    )
            );

            document.add(
                    new Paragraph(
                            "------------------------------------------"
                    )
            );

            for (Attendance attendance :
                    attendanceList) {

                document.add(
                        new Paragraph(
                                "Student : "
                                        + attendance.getStudent().getName()
                                        + " | Subject : "
                                        + attendance.getSubject().getSubjectName()
                                        + " | Date : "
                                        + attendance.getAttendanceDate()
                                        + " | Status : "
                                        + attendance.getStatus()
                        )
                );
            }

            document.close();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=attendance-report.pdf"
                    )
                    .contentType(
                            MediaType.APPLICATION_PDF
                    )
                    .body(
                            out.toByteArray()
                    );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

    // EXCEL REPORT

    @GetMapping("/attendance/excel")
    public ResponseEntity<byte[]> exportAttendanceExcel() {

        try {

            Workbook workbook =
                    new XSSFWorkbook();

            Sheet sheet =
                    workbook.createSheet(
                            "Attendance"
                    );

            Row header =
                    sheet.createRow(0);

            header.createCell(0)
                    .setCellValue("ID");

            header.createCell(1)
                    .setCellValue("Student");

            header.createCell(2)
                    .setCellValue("Subject");

            header.createCell(3)
                    .setCellValue("Date");

            header.createCell(4)
                    .setCellValue("Status");

            List<Attendance> attendanceList =
                    attendanceService.getAllAttendance();

            int rowNum = 1;

            for (Attendance attendance :
                    attendanceList) {

                Row row =
                        sheet.createRow(rowNum++);

                row.createCell(0)
                        .setCellValue(
                                attendance.getId()
                        );

                row.createCell(1)
                        .setCellValue(
                                attendance.getStudent().getName()
                        );

                row.createCell(2)
                        .setCellValue(
                                attendance.getSubject().getSubjectName()
                        );

                row.createCell(3)
                        .setCellValue(
                                attendance.getAttendanceDate().toString()
                        );

                row.createCell(4)
                        .setCellValue(
                                attendance.getStatus().toString()
                        );
            }

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            workbook.write(out);

            workbook.close();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=attendance-report.xlsx"
                    )
                    .contentType(
                            MediaType.APPLICATION_OCTET_STREAM
                    )
                    .body(
                            out.toByteArray()
                    );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }
}