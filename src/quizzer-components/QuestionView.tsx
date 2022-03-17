import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { Question } from "../quizzer_interfaces/question";
import { QuestionList } from "./QuestionList";
import { MultipleChoiceQuestion } from "./MultipleChoice";
import { ShortAnswer } from "./ShortAnswer";

export function QuestionView({
    question,
    addPoints
}: {
    question: Question;
    addPoints: (addedPoints: number) => void;
}): JSX.Element {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>{question.name}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{question.body}</p>
                </Col>
                <Col>
                    {question.type === "multiple_choice" ? (
                        <MultipleChoiceQuestion
                            options={question.options}
                            expectedAnswer={question.expected}
                            addPoints={addPoints}
                            points={question.points}
                        ></MultipleChoiceQuestion>
                    ) : (
                        <ShortAnswer
                            expectedAnswer={question.expected}
                            addPoints={addPoints}
                            points={question.points}
                        ></ShortAnswer>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
