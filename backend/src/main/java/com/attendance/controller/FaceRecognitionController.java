package com.attendance.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/face")
@CrossOrigin(origins = "*")
public class FaceRecognitionController {

    @GetMapping("/status")
    public String status() {
        return "Face Recognition Module Ready";
    }
}