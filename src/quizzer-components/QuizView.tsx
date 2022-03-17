import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { Question } from "../quizzer_interfaces/question";
import { QuestionList } from "./QuestionList";

function publishQuestion(question: Question, published: boolean): Question {
    return {
        ...question,
        published: published
    };
}

export function QuizView({ quiz }: { quiz: Quiz }): JSX.Element {
    const [questions, setQuestions] = useState<Question[]>(quiz.questions);
    const [points, setPoints] = useState<number>(0);

    function addPoints(addedPoints: number) {
        setPoints(points + addedPoints);
    }

    function setQuestionPublished(id: number, published: boolean) {
        setQuestions(
            questions.map(
                (question: Question): Question =>
                    id === question.id
                        ? publishQuestion(question, published)
                        : question
            )
        );
    }

    function editQuestion(id: number, newQuestion: Question) {
        setQuestions(
            questions.map(
                (question: Question): Question =>
                    question.id === id ? newQuestion : question
            )
        );
    }

    function deleteQuestion(id: number) {
        setQuestions(
            questions.filter(
                (question: Question): boolean => question.id !== id
            )
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>{quiz.title}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{quiz.description}</p>
                    <p>Number of Questions: {quiz.questions.length}</p>
                </Col>
            </Row>
            <Row>
                <QuestionList
                    questions={questions}
                    editQuestion={editQuestion}
                    deleteQuestion={deleteQuestion}
                    setQuestionPublished={setQuestionPublished}
                    addPoints={addPoints}
                ></QuestionList>
            </Row>
        </Container>
    );
}
