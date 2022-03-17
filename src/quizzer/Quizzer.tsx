import React, { useState } from "react";
import { Quiz } from "../quizzer_interfaces/Quiz";
import premadeQuizzes from "../data/quizzer.json";
import { QuizList } from "../quizzer-components/QuizList";

const QUIZZES = premadeQuizzes.map(
    (quiz): Quiz => ({
        ...quiz,
        opened: false
    })
);

export function Quizzer(): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);

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
                ></QuizList>
            </div>
        </div>
    );
}
