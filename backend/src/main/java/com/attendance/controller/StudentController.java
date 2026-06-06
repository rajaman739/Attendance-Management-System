package com.attendance.controller;

import com.attendance.entity.Student;
import com.attendance.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // GET ALL STUDENTS
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // CREATE STUDENT
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully";
    }

    // SEARCH BY ROLL NUMBER
    @GetMapping("/roll/{rollNo}")
    public Student getByRollNo(
            @PathVariable String rollNo) {

        return studentService.getByRollNo(rollNo);
    }

    // DEPARTMENT FILTER
    @GetMapping("/department/{department}")
    public List<Student> getByDepartment(
            @PathVariable String department) {

        return studentService.getByDepartment(department);
    }
}