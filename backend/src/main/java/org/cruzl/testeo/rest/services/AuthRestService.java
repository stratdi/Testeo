package org.cruzl.testeo.rest.services;

import java.time.LocalDateTime;

import org.cruzl.testeo.core.model.User;
import org.cruzl.testeo.core.services.UserService;
import org.cruzl.testeo.rest.dtos.BasicResponseDto;
import org.cruzl.testeo.rest.dtos.SignupDto;
import org.cruzl.testeo.rest.dtos.TokenDto;
import org.cruzl.testeo.security.jwt.JwtUtils;
import org.cruzl.testeo.security.services.UserDetailsImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthRestService {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;

  public ResponseEntity<BasicResponseDto> registerUser(@Valid @RequestBody SignupDto signupDto) {
    if (userService.exists(signupDto.getUsername())) {
      return ResponseEntity.badRequest().body(new BasicResponseDto("Error: Username is already taken!"));
    }

    if (userService.existsByEmail(signupDto.getEmail())) {
      return ResponseEntity.badRequest().body(new BasicResponseDto("Error: Email is already in use!"));
    }

    User user = this.buildUser(signupDto);
    userService.save(user);

    return ResponseEntity.ok(new BasicResponseDto("User registered successfully!"));
  }

  private User buildUser(@NonNull SignupDto signupDto) {
    return User.builder()
        .username(signupDto.getUsername())
        .email(signupDto.getEmail())
        .password(encoder.encode(signupDto.getPassword()))
        .registrationDate(LocalDateTime.now())
        .build();
  }

  public ResponseEntity<TokenDto> authenticateUser(Authentication authentication) {
    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    // List<String> roles = userDetails.getAuthorities().stream()
    // .map(item -> item.getAuthority())
    // .collect(Collectors.toList());

    log.info("Token: {}", jwtCookie.toString());

    // Pentura hem de retornar la Cookie i desar-la en Angular
    return ResponseEntity
        .ok()
        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new TokenDto(jwtCookie.toString()));
  }

  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new BasicResponseDto("You've been signed out!"));
  }
}
