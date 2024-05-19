package org.cruzl.testeo.rest.dtos;

import java.io.Serializable;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_EMPTY)
public class TestUpdateDto implements Serializable {

  private String title;
  private String description;

  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private BigDecimal successScore;
  @JsonFormat(shape = JsonFormat.Shape.STRING)
  private BigDecimal errorScore;

  private boolean favorite;

}
