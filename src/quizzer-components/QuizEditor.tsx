import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Question } from "../quizzer_interfaces/question";
import { Quiz } from "../quizzer_interfaces/Quiz";
import { QuestionEditor } from "./QuestionEditor";

export function QuizEditor({
    changeEditing,
    quiz,
    editQuiz,
    deleteQuiz,
    setQuestions,
    questions
}: {
    changeEditing: () => void;
    quiz: Quiz;
    editQuiz: (id: number, newQuiz: Quiz) => void;
    deleteQuiz: (id: number) => void;
    setQuestions: (questions: Question[]) => void;
    questions: Question[];
}): JSX.Element {
    const [title, setTitle] = useState<string>(quiz.title);
    const [description, setDescription] = useState<string>(quiz.description);

    function save() {
        editQuiz(quiz.id, {
            ...quiz,
            title: title,
            description: description,
            questions: questions
        });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/*Title*/}
                    <Form.Group controlId="formQuizTitle" as={Row}>
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={title}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Description */}
                    <Form.Group controlId="formQuizDescription" as={Row}>
                        <Form.Label column sm={2}>
                            Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/*Questions*/}
                    <QuestionEditor
                        questions={questions}
                        setQuestions={setQuestions}
                    ></QuestionEditor>
                    {/* Save/Cancel */}
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button onClick={cancel} variant="warning" className="me-5">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteQuiz(quiz.id)}
                        variant="danger"
                        className="me-8"
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
