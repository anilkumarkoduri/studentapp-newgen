package com.rds.service;

import java.util.List;

import com.rds.vo.StudentVO;

/**
 * Service Interface for managing User.
 */
public interface StudentService {
	
	public StudentVO createStudent(StudentVO studentVO) throws Exception;
	
	public List<StudentVO> getStudentsByInstitute(Integer instituteId) throws Exception;
	
}
