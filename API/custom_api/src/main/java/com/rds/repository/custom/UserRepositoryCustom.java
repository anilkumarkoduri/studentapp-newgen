package com.rds.repository.custom;

import com.rds.domain.User;

/**
 * Spring Data JPA repository for the User entity.
 */
public interface UserRepositoryCustom {
	public User validateLogin(String userName, String password) throws Exception;
}
