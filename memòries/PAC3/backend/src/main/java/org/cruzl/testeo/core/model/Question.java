package org.cruzl.testeo.core.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Question {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private @Id Long id;

  @ManyToOne
  @JoinColumn(name = "TEST_ID", nullable = false)
  private Test test;

  private @NotNull String statement;
  private @NotNull String feedback;

  @OneToMany(mappedBy = "question", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
  private List<Answer> answers = new ArrayList<>();

  public void clearAnswers() {
    // answers.forEach(a -> a.setQuestion(null));
    answers.clear();
  }

  public void addAnswer(@NonNull Answer answer) {
    answer.setQuestion(this);
    this.answers.add(answer);
  }
}
