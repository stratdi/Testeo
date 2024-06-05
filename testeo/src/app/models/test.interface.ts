import { Question } from "./question.interface";

export interface Test {
  id: number;
  userId: number;
  title: string;
  description: string;
  successScore: number;
  errorScore: number;
  lastTimeDone: string;
  favorite: boolean;
  questions: Question[];
}