import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Quiz } from "../quizzer_interfaces/Quiz";

export function AddQuizModal({
    show,
    handleClose,
    addQuiz
}: {
    show: boolean;
    handleClose: () => void;
    addQuiz: (newQuiz: Quiz) => void;
}) {
    const [id, setId] = useState<number>(3);

    function saveChanges() {
        addQuiz({
            id: id,
            title: "",
            description: "",
            questions: [],
            opened: false
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Title*/}
                <Form.Group controlId="formQuizID" as={Row}>
                    <Form.Label column sm={3}>
                        Quiz ID: (default quizzes are IDs 1 and 2)
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={id}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setId(parseInt(event.target.value))}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save New Quiz
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
