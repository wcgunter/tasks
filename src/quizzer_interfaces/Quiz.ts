import { Question } from "./question";

export interface Quiz {
    title: string;
    description: string;
    questions: Question[];
    opened: boolean;
    id: number;
}
