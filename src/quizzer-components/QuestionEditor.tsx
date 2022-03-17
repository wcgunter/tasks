import React from "react";
import { ListGroup, Form, Container, Row, Col } from "react-bootstrap";
import { Question } from "../quizzer_interfaces/question";

interface QuestionProps {
    question: Question;
    setQuestion: (id: number, newQuestion: Question) => void;
}

export function QuestionNameEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            value={question.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    name: event.target.value
                })
            }
        />
    );
}

export function QuestionBodyEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            value={question.body}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    body: event.target.value
                })
            }
        />
    );
}

export function QuestionTypeEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            value={question.type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    type: event.target.value
                })
            }
        />
    );
}

export function QuestionExpectedEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            value={question.expected}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    expected: event.target.value
                })
            }
        />
    );
}

export function QuestionPointsEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            type="number"
            value={question.points}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    points: parseInt(event.target.value)
                })
            }
        />
    );
}

export function QuestionOptionsEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Control
            value={question.options.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    options: event.target.value.split(",")
                })
            }
        />
    );
}

export function QuestionEditor({
    questions,
    setQuestions
}: {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
}): JSX.Element {
    function setQuestion(id: number, newQuestion: Question) {
        setQuestions(
            questions.map((question: Question) =>
                question.id === id ? newQuestion : question
            )
        );
    }

    return (
        <ListGroup as="ol" numbered>
            {questions.map((question: Question) => (
                <ListGroup.Item
                    as="li"
                    key={question.id}
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <Container>
                            {/* Question Name */}
                            <Row>
                                <Col>
                                    <p>Question Name</p>
                                </Col>
                                <Col>
                                    <QuestionNameEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionNameEditor>
                                </Col>
                            </Row>
                            {/* Question Body */}
                            <Row>
                                <Col>
                                    <p>Question Body</p>
                                </Col>
                                <Col>
                                    <QuestionBodyEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionBodyEditor>
                                </Col>
                            </Row>
                            {/* Question Expected */}
                            <Row>
                                <Col>
                                    <p>Question Expected Answer</p>
                                </Col>
                                <Col>
                                    <QuestionExpectedEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionExpectedEditor>
                                </Col>
                            </Row>
                            {/* Question Type */}
                            <Row>
                                <Col>
                                    <p>Question Type</p>
                                </Col>
                                <Col>
                                    <QuestionTypeEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionTypeEditor>
                                </Col>
                            </Row>
                            {/* Question Options */}
                            <Row>
                                <Col>
                                    <p>Question Options</p>
                                </Col>
                                <Col>
                                    <QuestionOptionsEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionOptionsEditor>
                                </Col>
                            </Row>
                            {/* Question Points */}
                            <Row>
                                <Col>
                                    <p>Question Points</p>
                                </Col>
                                <Col>
                                    <QuestionPointsEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionPointsEditor>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
