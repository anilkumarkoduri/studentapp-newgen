package com.rds.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.rds.domain.User;
import com.rds.repository.custom.UserRepositoryCustom;

/**
 * Spring Data JPA repository for the User entity.
 */
public interface UserRepository extends JpaRepository<User,Integer>, UserRepositoryCustom {

}
