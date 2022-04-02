import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Question } from "../quizzer_interfaces/question";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { ShortAnswer } from "./ShortAnswer";

export function QuestionView({
    question,
    addPoints,
    showUnPublished
}: {
    question: Question;
    addPoints: (addedPoints: number) => void;
    showUnPublished: boolean;
}): JSX.Element {
    return question.published || showUnPublished ? (
        <Container>
            <Row>
                <Col>
                    <h3 data-testid="question-name">{question.name}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6 data-testid="question-id">{question.id}</h6>
                </Col>
            </Row>
            <Row>
                <p>Worth {question.points} points</p>
                <h4>{question.body}</h4>
            </Row>
            <Row>
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
            </Row>
        </Container>
    ) : (
        <div></div>
    );
}
