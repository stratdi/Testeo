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
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Question {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private @Id Long id;

  @ManyToOne
  @JoinColumn(name = "TEST_ID", nullable = false)
  private Test test;

  private @NotNull String statement;
  private @NotNull String feedback;

  @OneToMany(mappedBy = "question")
  @Cascade(CascadeType.ALL)
  private List<Answer> answers = new ArrayList<>();
}