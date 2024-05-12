import { Answer } from "./answer.interface";

export interface Question {
  id: number;
  statement: string;
  feedback: string;
  answers: Answer[];
}