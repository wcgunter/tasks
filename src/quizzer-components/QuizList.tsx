import React from "react";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { Stack } from "react-bootstrap";
import { QuizView } from "./QuizView";

export function QuizList({
    quizzes,
    editQuiz,
    deleteQuiz
}: {
    quizzes: Quiz[];
    editQuiz: (id: number, newQuiz: Quiz) => void;
    deleteQuiz: (id: number) => void;
}): JSX.Element {
    return (
        <Stack gap={3}>
            {quizzes.map((quiz: Quiz) => (
                <div key={quiz.id} className="bg-light border m-2 p-2">
                    <QuizView
                        quiz={quiz}
                        editQuiz={editQuiz}
                        deleteQuiz={deleteQuiz}
                    ></QuizView>
                </div>
            ))}
        </Stack>
    );
}
