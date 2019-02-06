package com.rds.service;

import com.rds.vo.UserVO;

/**
 * Service Interface for managing User.
 */
public interface UserService {
	public UserVO validateLogin(UserVO userVO) throws Exception;
}
