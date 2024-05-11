package org.cruzl.testeo.core.model;

import org.hibernate.type.YesNoConverter;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Answer {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private @Id Long id;

  @ManyToOne
  @JoinColumn(name = "QUESTION_ID", nullable = false)
  private Question question;

  private @NotNull String text;

  @Convert(converter = YesNoConverter.class)
  private boolean correct;

}
