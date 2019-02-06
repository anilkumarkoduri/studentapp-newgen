package com.rds.repository.custom;

import java.util.List;

import com.rds.domain.Student;

/**
 * Spring Data JPA repository for the Student entity.
 */
public interface StudentRepositoryCustom {
	public List<Student> getStudentByInstitue(Integer institueId) throws Exception;
}
