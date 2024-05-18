package org.cruzl.testeo.rest.controllers;

import java.util.List;
import java.util.Optional;

import org.cruzl.testeo.core.model.Test;
import org.cruzl.testeo.core.services.TestService;
import org.cruzl.testeo.rest.dtos.QuestionAnsweredDto;
import org.cruzl.testeo.rest.dtos.QuestionDto;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestFavoriteDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.cruzl.testeo.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
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

  @GetMapping("/{id}/questions/{questionId}")
  public ResponseEntity<QuestionDto> get(@PathVariable Long id, @PathVariable Long questionId) {
    Optional<QuestionDto> question = this.testService.getQuestion(getUserId(), id, questionId);
    return question.isPresent() ? ResponseEntity.ok(question.get()) : ResponseEntity.notFound().build();
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
  public ResponseEntity<Long> create(@RequestBody TestUpdateDto test) {
    Long id = this.testService.create(getUserId(), test);
    return ResponseEntity
        .created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri())
        .body(id);
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

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    boolean deleted = this.testService.delete(getUserId(), id);
    return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<TestDto> get(@PathVariable Long id, @RequestParam(required = false) boolean loadQuestions,
      @RequestParam(required = false) boolean loadAnswers) {
    Optional<TestDto> test = Optional.empty();
    if (loadAnswers) {
      test = this.testService.getWithQuestionsAndAnswers(getUserId(), id);
    } else if (loadQuestions) {
      test = this.testService.getWithQuestions(getUserId(), id);
    } else {
      test = this.testService.get(this.getUserId(), id);
    }

    return test.isPresent() ? ResponseEntity.ok(test.get()) : ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}/favorite")
  public ResponseEntity<Void> setFavorite(@PathVariable Long id, @RequestBody TestFavoriteDto favorite) {
    boolean updated = this.testService.setFavorite(getUserId(), id, favorite.isFavorite());
    return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
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

  @PostMapping("/{id}/questions")
  public ResponseEntity<Void> create(@PathVariable Long id,
      @RequestBody QuestionUpdateDto question) {
    Long questionId = this.testService.createQuestion(getUserId(), id, question);
    return ResponseEntity
        .created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}/questions/{questionId}")
            .buildAndExpand(id, questionId).toUri())
        .build();
  }
}
