package com.rds.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rds.domain.User;
import com.rds.repository.UserRepository;
import com.rds.service.UserService;
import com.rds.vo.UserVO;

/**
 * Service Implementation for managing user.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    
    @Autowired
    private UserRepository userRepository;

	@Override
	public UserVO validateLogin(UserVO userVO) throws Exception {
		User user = null;
		try {
			user = userRepository.validateLogin(userVO.getUsername(), userVO.getPassword());
			if (null != user) {
				userVO.setUserId(user.getUserId());
				userVO.setUsername(user.getUsername());
				userVO.setFullName(user.getFullName());
				if (null != user.getInstitute()) {
					userVO.setInstituteId(user.getInstitute().getInstituteId());
					userVO.setInstituteName(user.getInstitute().getName());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return userVO;
	}
    
    
}
