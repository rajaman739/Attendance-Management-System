package com.attendance.dto;

import com.attendance.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String name;

    private String email;

    private String password;

    private Role role;
}