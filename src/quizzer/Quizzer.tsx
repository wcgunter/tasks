import React, { useState } from "react";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { Question } from "../quizzer_interfaces/question";
import premadeQuizzes from "../data/quizzer.json";
import { moveEmitHelpers } from "typescript";
import { QuizList } from "../quizzer-components/QuizList";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

const QUIZZES = premadeQuizzes.map(
    (quiz): Quiz => ({
        ...quiz,
        opened: false
    })
);

function openQuiz(quiz: Quiz, opened: boolean): Quiz {
    return {
        ...quiz,
        opened: opened
    };
}

export function Quizzer(): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);

    function setQuizOpen(id: number, opened: boolean) {
        setQuizzes(
            quizzes.map(
                (quiz: Quiz): Quiz =>
                    id === quiz.id ? openQuiz(quiz, opened) : quiz
            )
        );
    }

    function editQuiz(id: number, newQuiz: Quiz) {
        setQuizzes(
            quizzes.map((quiz: Quiz): Quiz => (quiz.id === id ? newQuiz : quiz))
        );
    }

    function deleteQuiz(id: number) {
        setQuizzes(quizzes.filter((quiz: Quiz): boolean => quiz.id !== id));
    }

    return (
        <div>
            <h3>Quizzer</h3>
            <div>
                <QuizList
                    quizzes={quizzes}
                    editQuiz={editQuiz}
                    deleteQuiz={deleteQuiz}
                    setQuizOpen={setQuizOpen}
                ></QuizList>
            </div>
        </div>
    );
}
