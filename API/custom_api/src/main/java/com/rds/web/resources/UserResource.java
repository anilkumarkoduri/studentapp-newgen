package com.rds.web.resources;

import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rds.service.UserService;
import com.rds.vo.UserVO;

/**
 * REST controller for managing Cluster.
 */
@RestController
@RequestMapping("/user")
public class UserResource {

	private final Logger log = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/validate-login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserVO validateLogin(@Valid @RequestBody UserVO userVO) throws URISyntaxException {
		try {
			userVO = userService.validateLogin(userVO);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return userVO;
	}
}
