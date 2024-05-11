package org.cruzl.testeo.core.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.type.YesNoConverter;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Test {

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private @Id Long id;

  private @NotNull Long userId;
  private @NotNull String title;
  private @NotNull String description;

  private BigDecimal successScore;
  private BigDecimal errorScore;

  private LocalDateTime lastTimeDone;

  @Convert(converter = YesNoConverter.class)
  private boolean favorite;

  @OneToMany(mappedBy = "test")
  @Cascade(CascadeType.ALL)
  private List<Question> questions = new ArrayList<>();

  public Optional<Question> getQuestion(@NonNull Long questionId) {
    return questions.stream().filter(q -> q.getId().equals(questionId)).findFirst();
  }
}
