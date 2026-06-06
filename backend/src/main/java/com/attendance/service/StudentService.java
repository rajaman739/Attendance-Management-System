package com.attendance.service;

import com.attendance.entity.Student;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id));
    }

    // Add Student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Update Student
    public Student updateStudent(Long id, Student updatedStudent) {

        Student student = getStudentById(id);

        student.setRollNo(updatedStudent.getRollNo());
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setDepartment(updatedStudent.getDepartment());
        student.setSemester(updatedStudent.getSemester());
        student.setFaceImage(updatedStudent.getFaceImage());

        return studentRepository.save(student);
    }

    // Delete Student
    public void deleteStudent(Long id) {

        Student student = getStudentById(id);

        studentRepository.delete(student);
    }

    // Find By Roll Number
    public Student getByRollNo(String rollNo) {

        return studentRepository.findByRollNo(rollNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with Roll No: " + rollNo));
    }

    // Department Wise Students
    public List<Student> getByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }
}