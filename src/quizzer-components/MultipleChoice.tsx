import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function MultipleChoiceQuestion({
    options,
    expectedAnswer,
    addPoints,
    points
}: {
    options: string[];
    expectedAnswer: string;
    addPoints: (addedPoints: number) => void;
    points: number;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>(options[0]);

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
        if (event.target.value === expectedAnswer) {
            addPoints(points);
        }
    }

    return (
        <div>
            <h6>Multiple Choice Question</h6>
            <Form.Label>Select an Answer:</Form.Label>
            <Form.Select value={answer} onChange={updateAnswer}>
                {options.map(
                    (dropOption: string): JSX.Element => (
                        <option key={dropOption} value={dropOption}>
                            {dropOption}
                        </option>
                    )
                )}
            </Form.Select>
            {answer === expectedAnswer ? "Status: ✔️" : "Status: ❌"}
        </div>
    );
}
