package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;

import lombok.Data;

@Data
public class AnswerDto implements Serializable {

  private Long id;

  private String text;
  private boolean correct;

}
