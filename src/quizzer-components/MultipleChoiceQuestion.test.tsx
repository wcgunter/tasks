import React from "react";
import { render, screen } from "@testing-library/react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import userEvent from "@testing-library/user-event";

let points = 0;
const questionPoints = 4;
function addPoints(point: number) {
    points = points + point;
}

describe("Quizzer - Multiple Choice Tests", () => {
    test("There is a select box", () => {
        render(
            <MultipleChoiceQuestion
                expectedAnswer="2"
                options={["1", "2", "3"]}
                addPoints={addPoints}
                points={questionPoints}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
    points = 0;
    test("The answer is initially incorrect", () => {
        render(
            <MultipleChoiceQuestion
                expectedAnswer="2"
                options={["1", "2", "3"]}
                addPoints={addPoints}
                points={questionPoints}
            />
        );
        expect(screen.getByText(/❌/i)).toBeInTheDocument();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
        expect(points === 0);
    });
    points = 0;
    test("Can choose the correct answer", () => {
        render(
            <MultipleChoiceQuestion
                expectedAnswer="2"
                options={["1", "2", "3"]}
                addPoints={addPoints}
                points={questionPoints}
            />
        );
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "2");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌/i)).not.toBeInTheDocument();
        expect(points === 4);
    });
    points = 0;
    test("Can choose the correct answer and then incorrect", () => {
        render(
            <MultipleChoiceQuestion
                expectedAnswer="2"
                options={["1", "2", "3"]}
                addPoints={addPoints}
                points={questionPoints}
            />
        );
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "2");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌/i)).not.toBeInTheDocument();
        userEvent.selectOptions(select, "3");
        expect(screen.getByText(/❌/i)).toBeInTheDocument();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
        expect(points === 0);
    });
    points = 0;
    test("Can start off initially correct", () => {
        render(
            <MultipleChoiceQuestion
                expectedAnswer="Alpha"
                options={["Alpha", "Beta", "Gamma"]}
                addPoints={addPoints}
                points={questionPoints}
            />
        );
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "Alpha");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌/i)).not.toBeInTheDocument();
        expect(points === 4);
    });
});
