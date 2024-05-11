package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_EMPTY)
public class QuestionUpdateDto implements Serializable {

  private String statement;
  private String feedback;

  private List<AnswerUpdateDto> answers = new ArrayList<>();

}