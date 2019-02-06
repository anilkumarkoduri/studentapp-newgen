package com.rds.web.resources;

import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rds.service.StudentService;
import com.rds.vo.StudentVO;

/**
 * REST controller for managing Student.
 */
@RestController
@RequestMapping("/student")
public class StudentResource {

    private final Logger log = LoggerFactory.getLogger(StudentResource.class);

    @Autowired
    private StudentService studentService;
    
    @RequestMapping(method = RequestMethod.POST, 
    		produces=MediaType.APPLICATION_JSON_VALUE)
    public StudentVO  createStudent(@RequestBody StudentVO studentVO) throws URISyntaxException {
    	try {
    		studentVO = studentService.createStudent(studentVO);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return studentVO;
    }
    
    @RequestMapping(value="/list/{instituteId}",
    		method = RequestMethod.GET, 
    		produces=MediaType.APPLICATION_JSON_VALUE)
    public List<StudentVO>  getAllStudentByInstitute(@PathVariable("instituteId") int instituteId) throws URISyntaxException {
		List<StudentVO> students = null;
    	try {
    		students = studentService.getStudentsByInstitute(instituteId);
		}  catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return students;	
    }
}
