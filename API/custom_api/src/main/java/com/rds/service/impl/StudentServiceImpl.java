package com.rds.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rds.domain.Institute;
import com.rds.domain.Student;
import com.rds.repository.StudentRepository;
import com.rds.service.StudentService;
import com.rds.vo.StudentVO;
import com.wms.rest.util.RDSUtil;

/**
 * Service Implementation for managing user.
 */
@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentServiceImpl.class);
    
    @Autowired
    private StudentRepository studentRepository;

	@Override
	public StudentVO createStudent(StudentVO studentVO) throws Exception {
        log.debug("Request to save Rdu : {}", studentVO);
        Student student = new Student();
        student.setFirstName(studentVO.getFirstName());
        student.setLastName(studentVO.getLastName());
        student.setEmail(studentVO.getEmail());
        student.setDateOfBirth(RDSUtil.getDateFromString(studentVO.getDateOfBirth()));
        student.setLocation(studentVO.getLocation());
        student.setPhone(studentVO.getPhone());
        Institute institute = new Institute();
        institute.setInstituteId(studentVO.getInstituteId());
        student.setInstitute(institute);
        student.setCreatedBy(1);
        student.setCreationDate(RDSUtil.getTodayTimestamp());
        student = studentRepository.save(student);	
        studentVO.setStudentId(student.getStudentId());
        return studentVO;
	}

	@Override
	public List<StudentVO> getStudentsByInstitute(Integer instituteId) throws Exception {
		List<Student> studentList = null;
        if (null != instituteId) {
        	studentList = studentRepository.getStudentByInstitue(instituteId);
        } else {
        	studentList = studentRepository.findAll(); 
        }
        
        List<StudentVO> studentVOList = new ArrayList<StudentVO>();
        for (Student student : studentList) {
        	StudentVO studentVO = new StudentVO();
        	studentVO.setStudentId(student.getStudentId());
        	studentVO.setFirstName(student.getFirstName());
        	studentVO.setLastName(student.getLastName());
        	studentVO.setEmail(student.getEmail());
        	if (null != student.getDateOfBirth())
        		studentVO.setDateOfBirth(student.getDateOfBirth().toString());
        	studentVO.setLocation(student.getLocation());
        	studentVO.setPhone(student.getPhone());
        	if (null != student.getInstitute()) {
        		studentVO.setInstituteId(student.getInstitute().getInstituteId());
        		studentVO.setInstituteName(student.getInstitute().getName());
        	}
        	studentVO.setCreatedBy(student.getCreatedBy());
        	if (null != student.getCreationDate())
        		studentVO.setCreationDate(student.getCreationDate().toString());
            
        	studentVOList.add(studentVO);
		}
        return studentVOList;
	}

    
}
