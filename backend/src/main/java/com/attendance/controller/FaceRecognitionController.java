package com.attendance.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/face")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://attendance-management-system-pink.vercel.app"
})
public class FaceRecognitionController {

    @GetMapping("/status")
    public String status() {
        return "Face Recognition Module Ready";
    }
}