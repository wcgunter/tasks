import React from "react";
import { ListGroup, Form, Container, Row, Col, Button } from "react-bootstrap";
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

export function QuestionDeleteEditor({
    question,
    setQuestions,
    questions
}: {
    question: Question;
    setQuestions: (questions: Question[]) => void;
    questions: Question[];
}): JSX.Element {
    return (
        <Button
            onClick={() =>
                setQuestions(
                    questions.filter(
                        (questionF: Question): boolean =>
                            questionF.id !== question.id
                    )
                )
            }
            variant="danger"
        >
            Delete Question
        </Button>
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

export function QuestionPublishedEditor({
    question,
    setQuestion
}: QuestionProps): JSX.Element {
    return (
        <Form.Check
            data-testid="publishedSwitch"
            type="switch"
            id="is-published-check"
            label="Published?"
            checked={question.published}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(question.id, {
                    ...question,
                    published: event.target.checked
                })
            }
        />
    );
}

export function QuestionEditor({
    questions,
    setQuestions,
    MoveQuestionUp,
    MoveQuestionDown
}: {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    MoveQuestionUp: (question: Question) => void;
    MoveQuestionDown: (question: Question) => void;
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
                            {/* Question Published */}
                            <Row>
                                <Col>
                                    <QuestionPublishedEditor
                                        question={question}
                                        setQuestion={setQuestion}
                                    ></QuestionPublishedEditor>
                                </Col>
                            </Row>
                            {/* Move Question Up */}
                            <Row>
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={() => MoveQuestionUp(question)}
                                    >
                                        Move Question Up
                                    </Button>
                                </Col>
                            </Row>
                            {/* Move Question Down */}
                            <Row>
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            MoveQuestionDown(question)
                                        }
                                    >
                                        Move Question Down
                                    </Button>
                                </Col>
                            </Row>
                            {/* Delete Question */}
                            <Row>
                                <Col>
                                    <QuestionDeleteEditor
                                        question={question}
                                        setQuestions={setQuestions}
                                        questions={questions}
                                    ></QuestionDeleteEditor>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
