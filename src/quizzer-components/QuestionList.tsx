import React from "react";
import { Question } from "../quizzer_interfaces/question";
import { Stack } from "react-bootstrap";
import { QuestionView } from "./QuestionView";

export function QuestionList({
    questions,
    addPoints
}: {
    questions: Question[];
    addPoints: (addedPoints: number) => void;
}): JSX.Element {
    return (
        <Stack gap={3}>
            {questions.map((question: Question) => (
                <div key={question.id} className="bg-light border m-2 p-2">
                    <QuestionView
                        question={question}
                        addPoints={addPoints}
                    ></QuestionView>
                </div>
            ))}
        </Stack>
    );
}
