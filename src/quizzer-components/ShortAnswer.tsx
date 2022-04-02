import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function ShortAnswer({
    expectedAnswer,
    points,
    addPoints
}: {
    expectedAnswer: string;
    points: number;
    addPoints: (addedPoints: number) => void;
}): JSX.Element {
    const [givenAnswer, setGivenAnswer] = useState<string>("");
    const [lastCorrect, setLastCorrect] = useState<boolean>(false);

    function updateGivenAnswer(event: ChangeEvent) {
        setGivenAnswer(event.target.value);
        if (event.target.value !== expectedAnswer) {
            if (lastCorrect === true) {
                addPoints(-points);
                setLastCorrect(false);
            }
        }
        if (event.target.value === expectedAnswer) {
            setLastCorrect(true);
            addPoints(points);
        }
    }

    function resetAnswer() {
        setGivenAnswer("");
        if (lastCorrect === true) {
            addPoints(-points);
            setLastCorrect(false);
        }
    }

    return (
        <div>
            <h6>Short Answer Question</h6>
            <Form.Group controlId="formGivenAnswer">
                <Form.Label>Check Answer</Form.Label>
                <Form.Control
                    value={givenAnswer}
                    onChange={updateGivenAnswer}
                    placeholder="Enter Answer Here"
                ></Form.Control>
            </Form.Group>
            <div>
                {givenAnswer === expectedAnswer
                    ? "Correct?: ✔️"
                    : "Correct?: ❌"}
            </div>
            <Button variant="warning" onClick={resetAnswer}>
                Reset Answer
            </Button>
        </div>
    );
}
