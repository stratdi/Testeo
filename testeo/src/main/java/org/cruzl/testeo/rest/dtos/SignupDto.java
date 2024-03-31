package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignupDto extends SigninDto {

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

}
