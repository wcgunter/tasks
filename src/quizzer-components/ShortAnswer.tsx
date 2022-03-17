import React, { useState } from "react";
import { Form } from "react-bootstrap";

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

    function updateGivenAnswer(event: ChangeEvent) {
        setGivenAnswer(event.target.value);
        if (event.target.value === expectedAnswer) {
            addPoints(points);
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
            <div>Result: {givenAnswer === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
