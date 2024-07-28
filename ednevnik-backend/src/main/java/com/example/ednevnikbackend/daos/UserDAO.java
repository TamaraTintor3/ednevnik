package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface UserDAO extends JpaRepository<User, Integer> {

    public  Optional<User> findByUsername(String username);
    public User findByUserId(Integer id);

}
