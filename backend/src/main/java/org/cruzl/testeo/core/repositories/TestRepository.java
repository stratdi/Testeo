package org.cruzl.testeo.core.repositories;

import java.util.List;
import java.util.Optional;

import org.cruzl.testeo.core.model.Test;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.NonNull;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {

  List<Test> findByUserId(@NonNull Long userId);

  @EntityGraph(attributePaths = { "questions" })
  List<Test> findWithQuestionsByUserId(@NonNull Long userId);

  List<Test> findByUserIdAndFavoriteTrue(@NonNull Long userId);

  List<Test> findWithQuestionsAndAnswersByUserId(Long userId);

  Optional<Test> findByUserIdAndId(@NonNull Long userId, @NonNull Long id);

  @EntityGraph(attributePaths = { "questions" })
  Optional<Test> findWithQuestionsByUserIdAndId(@NonNull Long userId, @NonNull Long id);

  Optional<Test> findWithQuestionsAndAnswersByUserIdAndId(@NonNull Long userId, @NonNull Long id);

}
