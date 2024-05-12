package org.cruzl.testeo.rest.converters;

import java.util.List;
import java.util.stream.Collectors;

import org.cruzl.testeo.core.model.Answer;
import org.cruzl.testeo.core.model.Question;
import org.cruzl.testeo.core.model.Test;
import org.cruzl.testeo.core.model.User;
import org.cruzl.testeo.rest.dtos.AnswerUpdateDto;
import org.cruzl.testeo.rest.dtos.QuestionDto;
import org.cruzl.testeo.rest.dtos.QuestionUpdateDto;
import org.cruzl.testeo.rest.dtos.TestDto;
import org.cruzl.testeo.rest.dtos.TestUpdateDto;
import org.cruzl.testeo.rest.dtos.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import lombok.NonNull;

@Mapper(componentModel = "spring")
public interface MapService {

	@Mapping(ignore = true, target = "questions")
	public TestDto convert(Test test);

	@Mapping(target = "questions", qualifiedByName = "questionWithoutAnswers")
	public TestDto convertWithQuestions(Test test);

	public TestDto convertWithQuestionsAndAnswers(Test test);

	@Named("questionWithoutAnswers")
	@Mapping(ignore = true, target = "answers")
	public QuestionDto convert(Question question);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "userId", ignore = true)
	@Mapping(target = "lastTimeDone", ignore = true)
	@Mapping(target = "questions", ignore = true)
	public void update(@MappingTarget Test testDB, TestUpdateDto test);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "test", ignore = true)
	@Mapping(target = "answers", expression = "java(update(questionDb, question.getAnswers()))")
	public void update(@MappingTarget Question questionDb, @NonNull QuestionUpdateDto question);

	@Mapping(target = "question", ignore = true)
	public Answer convert(@NonNull AnswerUpdateDto answer);

	public UserDto convert(@NonNull User user);

	public default List<Answer> update(Question question, @NonNull List<AnswerUpdateDto> answers) {
		question.getAnswers().clear();
		List<Answer> updated = answers.stream().map(a -> this.convert(a)).collect(Collectors.toList());
		updated.forEach(a -> a.setQuestion(question));

		return updated;
	}
}
