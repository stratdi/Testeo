package org.cruzl.testeo.rest.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.cruzl.testeo.core.model.User;
import org.cruzl.testeo.core.services.UserService;
import org.cruzl.testeo.rest.converters.MapService;
import org.cruzl.testeo.rest.dtos.BasicResponseDto;
import org.cruzl.testeo.rest.dtos.SignupDto;
import org.cruzl.testeo.rest.dtos.TokenDto;
import org.cruzl.testeo.rest.dtos.UserDto;
import org.cruzl.testeo.security.jwt.JwtUtils;
import org.cruzl.testeo.security.services.UserDetailsImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
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

  private final UserService userService;
  private final MapService mapService;
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

    log.info("Token: {}", jwtCookie.toString());

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

  public ResponseEntity<UserDto> getUser() {
    Optional<UserDto> user = this.userService.get(this.getUsername()).map(u -> this.mapService.convert(u));
    return user.isPresent() ? ResponseEntity.ok(user.get()) : ResponseEntity.internalServerError().build();
  }

  private String getUsername() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl user) {
      return user.getUsername();
    }
    return null;
  }
}
