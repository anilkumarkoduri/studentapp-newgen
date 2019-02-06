package com.rds.repository.custom.impl;


import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import com.rds.domain.User;
import com.rds.repository.custom.UserRepositoryCustom;

/**
 * Spring Data JPA repository for the User entity.
 */
public class UserRepositoryImpl implements UserRepositoryCustom{

	@PersistenceContext
    private EntityManager entityManager;

	@Override
	public User validateLogin(String userName, String password) throws Exception {
		String query = "SELECT u FROM User u where u.username=:userName and u.password=:password";
		User object = null;
		try {
			object = (User)this.entityManager.createQuery(query)
							  .setParameter("userName", userName)
							  .setParameter("password", password)
					          .getSingleResult();
			
		} catch (NoResultException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return object;
	}
	
	
}
