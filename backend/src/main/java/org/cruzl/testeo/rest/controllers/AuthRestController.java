package org.cruzl.testeo.rest.controllers;

import org.cruzl.testeo.rest.dtos.BasicResponseDto;
import org.cruzl.testeo.rest.dtos.SigninDto;
import org.cruzl.testeo.rest.dtos.SignupDto;
import org.cruzl.testeo.rest.dtos.TokenDto;
import org.cruzl.testeo.rest.services.AuthRestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
// for Angular Client (withCredentials)
// @CrossOrigin(origins = "http://localhost:8081", maxAge = 3600,
// allowCredentials="true")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication API", description = "Authentication related API services.")
public class AuthRestController {

  private final AuthRestService service;
  private final AuthenticationManager authManager;

  @PostMapping("/signin")
  public ResponseEntity<TokenDto> authenticateUser(@Valid @RequestBody SigninDto signinDto) {
    log.info("PEMMM {}", signinDto);
    Authentication authentication = authManager
        .authenticate(new UsernamePasswordAuthenticationToken(signinDto.getUsername(), signinDto.getPassword()));

    return this.service.authenticateUser(authentication);
  }

  @PostMapping("/signup")
  public ResponseEntity<BasicResponseDto> registerUser(@Valid @RequestBody SignupDto signupDto) {
    return this.service.registerUser(signupDto);
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    return this.service.logoutUser();
  }

}
