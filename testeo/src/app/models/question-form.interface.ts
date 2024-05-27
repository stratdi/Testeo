export interface QuestionForm {
  statement: string;
  feedback: string;
  answers: AnswerForm[];
}

export interface AnswerForm {
  text: string;
  correct?: false;
}