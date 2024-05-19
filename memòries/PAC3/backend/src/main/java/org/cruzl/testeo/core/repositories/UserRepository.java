package org.cruzl.testeo.core.repositories;

import java.util.Optional;

import org.cruzl.testeo.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.NonNull;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByUsername(@NonNull String username);

  boolean existsByUsername(@NonNull String username);

  boolean existsByEmail(@NonNull String email);

}
