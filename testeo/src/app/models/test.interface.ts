import { Question } from "./question.interface";

export interface Test {
  id: number;
  userId: number;
  title: string;
  description: string;
  successScore: string;
  errorScore: string;
  lastTimeDone: string;
  favorite: boolean;
  questions: Question[];
}