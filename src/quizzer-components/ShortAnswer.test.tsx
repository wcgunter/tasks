import React from "react";
import { render, screen } from "@testing-library/react";
import { ShortAnswer } from "./ShortAnswer";
import userEvent from "@testing-library/user-event";

let points = 0;
const questionPoints = 4;
function addPoints(point: number) {
    points = points + point;
}

describe("ShortAnswer Component Tests", () => {
    test("There is an input box", () => {
        render(
            <ShortAnswer
                expectedAnswer="42"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        const inputBox = screen.getByRole("textbox");
        expect(inputBox).toBeInTheDocument();
        expect(points === 0);
    });
    points = 0;
    test("The answer is originally incorrect.", () => {
        render(
            <ShortAnswer
                expectedAnswer="42"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        expect(screen.getByText(/❌/i)).toBeInTheDocument();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
        expect(points === 0);
    });
    points = 0;
    test("Entering the right answer makes it correct.", () => {
        render(
            <ShortAnswer
                expectedAnswer="42"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        const inputBox = screen.getByRole("textbox");
        userEvent.type(inputBox, "42");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌/i)).not.toBeInTheDocument();
        expect(points === 4);
    });
    points = 0;
    test("Entering the wrong answer makes it incorrect.", () => {
        render(
            <ShortAnswer
                expectedAnswer="42"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        const inputBox = screen.getByRole("textbox");
        userEvent.type(inputBox, "43");
        expect(screen.getByText(/❌/i)).toBeInTheDocument();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
        expect(points === 0);
    });
    test("Entering a different right answer makes it correct.", () => {
        render(
            <ShortAnswer
                expectedAnswer="Hello"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        const inputBox = screen.getByRole("textbox");
        userEvent.type(inputBox, "Hello");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌/i)).not.toBeInTheDocument();
        expect(points === 4);
    });
    points = 0;
    test("Entering a different wrong answer still makes it incorrect.", () => {
        render(
            <ShortAnswer
                expectedAnswer="Hello"
                points={questionPoints}
                addPoints={addPoints}
            />
        );
        const inputBox = screen.getByRole("textbox");
        userEvent.type(inputBox, "42");
        expect(screen.getByText(/❌/i)).toBeInTheDocument();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
        expect(points === 0);
    });
    points = 0;
});
