package org.cruzl.testeo.core.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.cruzl.testeo.core.model.Answer;
import org.cruzl.testeo.core.model.Question;
import org.cruzl.testeo.core.model.Test;
import org.cruzl.testeo.core.repositories.TestRepository;
import org.cruzl.testeo.rest.converters.MapService;
import org.cruzl.testeo.rest.dtos.QuestionDto;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestService {

  private final TestRepository repository;
  private final MapService mapService;

  public List<TestDto> get(@NonNull Long userId) {
    return this.repository.findByUserId(userId).stream().map(t -> mapService.convert(t)).toList();
  }

  private Optional<Test> getEntity(@NonNull Long userId, @NonNull Long id) {
    return this.repository.findByUserIdAndId(userId, id);
  }

  public Optional<TestDto> get(@NonNull Long userId, @NonNull Long id) {
    return this.getEntity(userId, id).map(t -> mapService.convert(t));
  }

  public List<TestDto> getWithQuestions(@NonNull Long userId) {
    return this.repository.findWithQuestionsByUserId(userId).stream().map(t -> mapService.convertWithQuestions(t))
        .toList();
  }

  public Optional<TestDto> getWithQuestions(@NonNull Long userId, @NonNull Long id) {
    return this.repository.findWithQuestionsByUserIdAndId(userId, id).map(t -> mapService.convertWithQuestions(t));
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

  public Optional<TestDto> getWithQuestionsAndAnswers(@NonNull Long userId, @NonNull Long id) {
    return this.getEntityWithQuestionsAndAnswers(userId, id).map(t -> mapService.convertWithQuestionsAndAnswers(t));
  }

  private Optional<Test> getEntityWithQuestionsAndAnswers(@NonNull Long userId, @NonNull Long id) {
    return this.repository.findWithQuestionsAndAnswersByUserIdAndId(userId, id);
  }

  public Long create(@NonNull Long userId, @NonNull TestUpdateDto test) {
    Test testDb = new Test();
    testDb.setUserId(userId);
    this.mapService.update(testDb, test);
    return this.repository.saveAndFlush(testDb).getId();
  }

  public boolean update(@NonNull Long userId, @NonNull Long id, @NonNull TestUpdateDto test) {
    boolean updated = false;
    Optional<Test> testDb = this.getEntity(userId, id);
    if (testDb.isPresent()) {
      this.mapService.update(testDb.get(), test);
      this.repository.saveAndFlush(testDb.get());
      updated = true;
    }

    return updated;
  }

  public boolean update(@NonNull Long userId, @NonNull Long id, @NonNull Long questionId,
      @NonNull QuestionUpdateDto question) {
    boolean updated = false;
    Optional<Test> testDb = this.getEntityWithQuestionsAndAnswers(userId, id);
    if (testDb.isPresent()) {
      Optional<Question> questionDb = testDb.get().getQuestion(questionId);
      if (questionDb.isPresent()) {
        questionDb.get().clearAnswers();
        questionDb.get().setStatement(question.getStatement());
        questionDb.get().setFeedback(question.getFeedback());

        question.getAnswers().forEach(q -> questionDb.get().addAnswer(new Answer(q.getText(), q.isCorrect())));
        this.repository.saveAndFlush(testDb.get());
        updated = true;
      }
    }

    return updated;
  }

  public boolean setFavorite(@NonNull Long userId, @NonNull Long id, boolean favorite) {
    boolean updated = false;
    Optional<Test> testDb = this.getEntity(userId, id);
    if (testDb.isPresent()) {
      testDb.get().setFavorite(favorite);
      this.repository.saveAndFlush(testDb.get());
      updated = true;
    }

    return updated;
  }

  public boolean delete(@NonNull Long userId, @NonNull Long id) {
    boolean deleted = false;
    Optional<Test> testDb = this.getEntity(userId, id);
    if (testDb.isPresent()) {
      this.repository.delete(testDb.get());
      deleted = true;
    }

    return deleted;
  }

  public Optional<QuestionDto> getQuestion(@NonNull Long userId, @NonNull Long id, @NonNull Long questionId) {
    Optional<QuestionDto> question = Optional.empty();
    Optional<Test> test = this.getEntityWithQuestionsAndAnswers(userId, id);
    if (test.isPresent()) {
      question = test.get().getQuestion(questionId).map(q -> this.mapService.convertWithAnswers(q));
    }
    return question;
  }

  public Long createQuestion(@NonNull Long userId, @NonNull Long id, @NonNull QuestionUpdateDto question) {
    Long questionId = null;
    Optional<Test> testDb = this.getEntityWithQuestionsAndAnswers(userId, id);
    if (testDb.isPresent()) {
      Question questionDb = new Question();
      this.mapService.update(questionDb, question);
      testDb.get().addQuestion(questionDb);
      questionId = this.repository.saveAndFlush(testDb.get()).getId();
    }

    return questionId;
  }

  public boolean deleteQuestion(@NonNull Long userId, @NonNull Long id, @NonNull Long questionId) {
    boolean deleted = false;
    Optional<Test> testDb = this.getEntity(userId, id);
    if (testDb.isPresent()) {
      testDb.get().deleteQuestion(questionId);
      this.repository.saveAndFlush(testDb.get());
      deleted = true;
    }

    return deleted;
  }

  public boolean evaluate(@NonNull Long userId, @NonNull Long id) {
    log.info("USER {}. ID {}", userId, id);
    boolean updated = false;
    Optional<Test> testDb = this.getEntity(userId, id);
    if (testDb.isPresent()) {
      testDb.get().setLastTimeDone(LocalDateTime.now());
      this.repository.saveAndFlush(testDb.get());
      updated = true;
    }

    return updated;
  }
}
