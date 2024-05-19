package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_EMPTY)
public class TestDto implements Serializable {

  private Long id;

  private Long userId;
  private String title;
  private String description;

  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private BigDecimal successScore;
  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private BigDecimal errorScore;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime lastTimeDone;

  private boolean favorite;

  private List<QuestionDto> questions = new ArrayList<>();

}
