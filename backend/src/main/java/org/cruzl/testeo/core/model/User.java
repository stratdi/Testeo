package org.cruzl.testeo.core.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Builder
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class User {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private @Id Long id;

  @Min(value = 3)
  private String username;
  @Min(value = 8)
  private String password;

  @Email
  private String email;

  private LocalDateTime registrationDate;
  private LocalDateTime lastAccessDate;

}
