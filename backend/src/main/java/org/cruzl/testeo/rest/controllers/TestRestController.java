package org.cruzl.testeo.rest.controllers;

import java.util.List;

import org.cruzl.testeo.core.services.TestService;
import org.cruzl.testeo.rest.dtos.QuestionAnsweredDto;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.cruzl.testeo.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tests")
@RequiredArgsConstructor
public class TestRestController {

  private final TestService testService;

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

  @GetMapping("/favorites")
  public ResponseEntity<List<TestDto>> getFavorites() {
    List<TestDto> tests = this.testService.getFavorites(this.getUserId());
    return ResponseEntity.ok(tests);
  }

  private Long getUserId() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    if (principal instanceof UserDetailsImpl user) {
      return user.getId();
    }

    return null;
  }

  @PutMapping("/{id}")
  public void update(@PathVariable Long id, @RequestBody TestUpdateDto test) {
    this.testService.update(getUserId(), id, test);
  }

  @PutMapping("/{id}/take")
  public void take(@PathVariable String id, @RequestBody List<QuestionAnsweredDto> answers) {

    // return entity;
  }

  @PutMapping("/{id}/questions/{questionId}")
  public void updateQuestion(@PathVariable Long id, @PathVariable Long questionId,
      @RequestBody QuestionUpdateDto question) {
    this.testService.update(getUserId(), id, questionId, question);
  }
}
