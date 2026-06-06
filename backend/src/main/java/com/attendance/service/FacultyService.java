package com.attendance.service;

import com.attendance.entity.Faculty;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Faculty not found with id: " + id));
    }

    public Faculty saveFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public Faculty updateFaculty(Long id, Faculty updatedFaculty) {

        Faculty faculty = getFacultyById(id);

        faculty.setName(updatedFaculty.getName());
        faculty.setEmail(updatedFaculty.getEmail());
        faculty.setDepartment(updatedFaculty.getDepartment());

        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(Long id) {

        Faculty faculty = getFacultyById(id);

        facultyRepository.delete(faculty);
    }
}