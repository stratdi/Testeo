package org.cruzl.testeo.rest.controllers;

import java.util.List;
import java.util.Optional;

import org.cruzl.testeo.core.model.Test;
import org.cruzl.testeo.core.services.TestService;
import org.cruzl.testeo.rest.dtos.QuestionAnsweredDto;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.cruzl.testeo.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tests")
@RequiredArgsConstructor
public class TestRestController {

  private final TestService testService;

  private Long getUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl user) {
      return user.getId();
    }
    return null;
  }

  @GetMapping
  public ResponseEntity<List<TestDto>> get(@RequestParam(required = false) boolean loadQuestions,
      @RequestParam(required = false) boolean loadAnswers) {
    List<TestDto> tests = null;

    if (loadAnswers) {
      tests = this.testService.getWithQuestionsAndAnswers(getUserId());
    } else if (loadQuestions) {
      tests = this.testService.getWithQuestions(getUserId());
    } else {
      tests = this.testService.get(this.getUserId());
    }

    return ResponseEntity.ok(tests);
  }

  @PostMapping
  public ResponseEntity<Void> create(@RequestBody TestUpdateDto test) {
    Long id = this.testService.create(getUserId(), test);
    return ResponseEntity
        .created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri()).build();
  }

  @GetMapping("/favorites")
  public ResponseEntity<List<TestDto>> getFavorites() {
    List<TestDto> tests = this.testService.getFavorites(this.getUserId());
    return ResponseEntity.ok(tests);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody TestUpdateDto test) {
    boolean updated = this.testService.update(getUserId(), id, test);
    return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<TestDto> get(@PathVariable Long id) {
    Optional<TestDto> test = this.testService.get(getUserId(), id);
    return test.isPresent() ? ResponseEntity.ok(test.get()) : ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}/take")
  public void take(@PathVariable String id, @RequestBody List<QuestionAnsweredDto> answers) {

    // return entity;
  }

  @PutMapping("/{id}/questions/{questionId}")
  public ResponseEntity<Void> updateQuestion(@PathVariable Long id, @PathVariable Long questionId,
      @RequestBody QuestionUpdateDto question) {
    boolean updated = this.testService.update(getUserId(), id, questionId, question);
    return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }
}