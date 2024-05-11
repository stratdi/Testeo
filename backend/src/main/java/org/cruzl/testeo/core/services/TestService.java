package org.cruzl.testeo.core.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.cruzl.testeo.core.model.Question;
import org.cruzl.testeo.core.model.Test;
import org.cruzl.testeo.core.repositories.TestRepository;
import org.cruzl.testeo.rest.converters.MapService;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {

  private final TestRepository repository;
  private final MapService mapService;

  public List<TestDto> get(@NonNull Long userId) {
    return this.repository.findByUserId(userId).stream().map(t -> mapService.convert(t)).toList();
  }

  public Optional<Test> get(@NonNull Long userId, @NonNull Long id) {
    return this.repository.findByUserIdAndId(userId, id);
  }

  public List<TestDto> getWithQuestions(@NonNull Long userId) {
    return this.repository.findWithQuestionsByUserId(userId).stream().map(t -> mapService.convertWithQuestions(t))
        .toList();
  }

  public List<TestDto> getFavorites(@NonNull Long userId) {
    return this.repository.findByUserIdAndFavoriteTrue(userId).stream().map(t -> mapService.convert(t)).toList();
  }

  public @NonNull Test save(@NonNull Test test) {
    return this.repository.saveAndFlush(test);
  }

  public List<TestDto> getWithQuestionsAndAnswers(@NonNull Long userId) {
    return this.repository.findWithQuestionsAndAnswersByUserId(userId).stream()
        .map(t -> mapService.convertWithQuestionsAndAnswers(t)).toList();
  }

  public Optional<Test> getWithQuestionsAndAnswers(@NonNull Long userId, @NonNull Long id) {
    return this.repository.findWithQuestionsAndAnswersByUserIdAndId(userId, id);
  }

  public void update(@NonNull Long userId, @NonNull Long id, @NonNull TestUpdateDto test) {
    Optional<Test> testDb = this.get(userId, id);
    if (testDb.isPresent()) {
      this.mapService.update(testDb.get(), test);
      testDb.get().setLastTimeDone(LocalDateTime.now());
      this.repository.saveAndFlush(testDb.get());
    }
  }

  public void update(@NonNull Long userId, @NonNull Long id, @NonNull Long questionId,
      @NonNull QuestionUpdateDto question) {
    Optional<Test> testDb = this.getWithQuestionsAndAnswers(userId, id);
    if (testDb.isPresent()) {
      testDb.get().setLastTimeDone(LocalDateTime.now());
      Optional<Question> questionDb = testDb.get().getQuestion(questionId);
      if (questionDb.isPresent()) {
        this.mapService.update(questionDb.get(), question);

        this.repository.saveAndFlush(testDb.get());
      }
    }
  }
}
