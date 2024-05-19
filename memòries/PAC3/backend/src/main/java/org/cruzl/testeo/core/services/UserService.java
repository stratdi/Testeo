package org.cruzl.testeo.core.services;

import java.util.Optional;

import org.cruzl.testeo.core.model.User;
import org.cruzl.testeo.core.repositories.UserRepository;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repository;

  public Optional<User> get(@NonNull String username) {
    return this.repository.findByUsername(username);
  }

  public boolean exists(@NonNull String username) {
    return this.repository.existsByUsername(username);
  }

  public boolean existsByEmail(@NonNull String email) {
    return this.repository.existsByEmail(email);
  }

  public @NonNull User save(@NonNull User user) {
    return this.repository.saveAndFlush(user);
  }
}
