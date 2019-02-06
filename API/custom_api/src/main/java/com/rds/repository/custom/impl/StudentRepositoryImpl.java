package com.rds.repository.custom.impl;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.rds.domain.Student;
import com.rds.repository.custom.StudentRepositoryCustom;

/**
 * Spring Data JPA repository for the Student entity.
 */
public class StudentRepositoryImpl implements StudentRepositoryCustom{

	@PersistenceContext
    private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Student> getStudentByInstitue(Integer institueId) throws Exception {
		List<Student> studentList = null;
		try {
			Query query = this.entityManager.createQuery("SELECT s FROM Student s WHERE s.institute.instituteId = :instituteId");
			query.setParameter("instituteId", institueId);
			studentList = query.getResultList();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return studentList;
	}

	
	
}
