package com.rds.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.rds.domain.Student;
import com.rds.repository.custom.StudentRepositoryCustom;

/**
 * Spring Data JPA repository for the Student entity.
 */
public interface StudentRepository extends JpaRepository<Student,Integer>, StudentRepositoryCustom {

}
