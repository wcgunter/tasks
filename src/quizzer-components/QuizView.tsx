import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { Question } from "../quizzer_interfaces/question";
import { QuestionList } from "./QuestionList";
import { QuizEditor } from "./QuizEditor";

export function QuizView({
    quiz,
    editQuiz,
    deleteQuiz
}: {
    quiz: Quiz;
    editQuiz: (id: number, newQuiz: Quiz) => void;
    deleteQuiz: (id: number) => void;
}): JSX.Element {
    const [questions, setQuestions] = useState<Question[]>(quiz.questions);
    const [points, setPoints] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [showUnPublished, setShowUnPublished] = useState<boolean>(true);

    function flipShowUnPublished(): void {
        setShowUnPublished(!showUnPublished);
    }

    function flipVisibility(): void {
        setVisible(!visible);
    }

    function addPoints(addedPoints: number) {
        setPoints(points + addedPoints);
    }

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <QuizEditor
            changeEditing={changeEditing}
            quiz={quiz}
            editQuiz={editQuiz}
            deleteQuiz={deleteQuiz}
            setQuestions={setQuestions}
            questions={questions}
        ></QuizEditor>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h3>{quiz.title}</h3>
                </Col>
            </Row>
            <Row>
                <p>{quiz.description}</p>
                <p>Number of Questions: {quiz.questions.length}</p>
                <p>
                    Possible Points:{" "}
                    {quiz.questions.reduce(
                        (currentTotal: number, q: Question) =>
                            currentTotal + q.points,
                        0
                    )}
                </p>
            </Row>
            <Row>
                <Button onClick={flipVisibility}>Open/Close Quiz</Button>
                <Button onClick={changeEditing} variant="outline-danger">
                    Edit Mode
                </Button>
            </Row>
            {visible && (
                <Row>
                    <p>Current Points: {points}</p>
                    <Button onClick={flipShowUnPublished} variant="info">
                        Filter Published/Unpublished
                    </Button>
                    <QuestionList
                        questions={questions}
                        addPoints={addPoints}
                        showUnPublished={showUnPublished}
                    ></QuestionList>
                </Row>
            )}
        </Container>
    );
}
