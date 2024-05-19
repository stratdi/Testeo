export interface QuestionForm {
  statement: string;
  feedback: string;
  answers: AnswerForm[];
  correctAnswer: number;
}

export interface AnswerForm {
  text: string;
  correct?: false;
}