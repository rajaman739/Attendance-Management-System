package com.attendance.controller;

import com.attendance.dto.AuthResponse;
import com.attendance.dto.LoginRequest;
import com.attendance.dto.RegisterRequest;
import com.attendance.entity.User;
import com.attendance.security.JwtUtil;
import com.attendance.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(
            AuthService authService,
            JwtUtil jwtUtil) {

        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        User user = authService.login(request);

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        return new AuthResponse(
                "Login successful",
                token);
    }
}