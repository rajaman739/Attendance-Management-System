package com.attendance.controller;

import com.attendance.entity.Faculty;
import com.attendance.service.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id);
    }

    @PostMapping
    public Faculty createFaculty(@RequestBody Faculty faculty) {
        return facultyService.saveFaculty(faculty);
    }

    @PutMapping("/{id}")
    public Faculty updateFaculty(
            @PathVariable Long id,
            @RequestBody Faculty faculty) {

        return facultyService.updateFaculty(id, faculty);
    }

    @DeleteMapping("/{id}")
    public String deleteFaculty(@PathVariable Long id) {

        facultyService.deleteFaculty(id);

        return "Faculty deleted successfully";
    }
}