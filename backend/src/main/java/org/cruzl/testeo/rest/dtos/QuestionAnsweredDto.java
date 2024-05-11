package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_EMPTY)
public class QuestionAnsweredDto implements Serializable {

  private Long questionId;
  private Long answerId;

}
