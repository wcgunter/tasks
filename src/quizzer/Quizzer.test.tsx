import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import { Quiz } from "../quizzer_interfaces/Quiz";
import premadeQuizzes from "../data/quizzer.json";
import userEvent from "@testing-library/user-event";

const quizzes = premadeQuizzes.map(
    (quiz): Quiz => ({
        ...quiz,
        opened: false
    })
);

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("The Quizzes Display", () => {
        expect(screen.getByText(quizzes[0].title)).toBeInTheDocument();
        expect(screen.getByText(quizzes[0].description)).toBeInTheDocument();
        expect(screen.getByText(quizzes[1].title)).toBeInTheDocument();
        expect(screen.getByText(quizzes[1].description)).toBeInTheDocument();
        const numberOfQuestionText = screen.queryAllByText(
            "Number of Questions: 3"
        );
        expect(numberOfQuestionText).toHaveLength(2);
    });
    test("The Expand Button Appears", () => {
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        });
        expect(openCloseButton).toHaveLength(2);
    });
    test("The Edit Button Appears", () => {
        const openCloseButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        });
        expect(openCloseButton).toHaveLength(2);
    });
    test("Clicking Open/Close Quiz shows the current number of points", () => {
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        const numberOfPoints = screen.queryAllByText(/Current Points: 0/);
        expect(numberOfPoints).toHaveLength(1);
    });
    test("Clicking Open/Close Quiz shows the questions in the quiz", () => {
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(
            screen.getByText(quizzes[0].questions[0].name)
        ).toBeInTheDocument();
        expect(
            screen.getByText(quizzes[0].questions[0].body)
        ).toBeInTheDocument();
        expect(
            screen.getByText(quizzes[0].questions[1].name)
        ).toBeInTheDocument();
        expect(
            screen.getByText(quizzes[0].questions[1].body)
        ).toBeInTheDocument();
        expect(
            screen.getByText(quizzes[0].questions[2].name)
        ).toBeInTheDocument();
        expect(
            screen.getByText(quizzes[0].questions[2].body)
        ).toBeInTheDocument();
        const numberOfPoints = screen.queryAllByText(/Worth 4 points/);
        expect(numberOfPoints).toHaveLength(3);
    });
    test("Clicking Edit Mode shows the edit screen", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const inputBox = screen.getAllByRole("textbox");
        expect(inputBox).toHaveLength(5 * quizzes[0].questions.length + 2);
        const saveButton = screen.getByRole("button", { name: /Save/i });
        expect(saveButton).toBeInTheDocument();
        const cancelButton = screen.getByRole("button", { name: /Cancel/i });
        expect(cancelButton).toBeInTheDocument();
        const deleteButton = screen.getByRole("button", { name: "Delete" });
        expect(deleteButton).toBeInTheDocument();
    });
    test("Editing Quiz Title changes Quiz Title", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const titlebox = screen.getByDisplayValue("Math Quiz");
        userEvent.type(titlebox, " Addition");
        const saveButton = screen.getByRole("button", { name: /Save/i });
        saveButton.click();
        expect(screen.getByText("Math Quiz Addition")).toBeInTheDocument();
    });
    test("Clicking Cancel leaves editing mode, does not save", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const titlebox = screen.getByDisplayValue("Math Quiz");
        userEvent.type(titlebox, " Addition");
        const cancelButton = screen.getAllByRole("button", {
            name: /Cancel/i
        })[0];
        cancelButton.click();
        expect(screen.getByText("Math Quiz")).toBeInTheDocument();
    });
    test("Clicking delete removes the quiz", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const deleteButton = screen.getByRole("button", {
            name: "Delete"
        });
        deleteButton.click();
        expect(screen.queryByText("Math Quiz")).not.toBeInTheDocument();
    });
    test("Clicking delete question removes the question", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const deleteButton = screen.getAllByRole("button", {
            name: "Delete Question"
        })[0];
        deleteButton.click();
        const saveButton = screen.getByRole("button", { name: /Save/i });
        saveButton.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(screen.queryByText("What is 32 + 2?")).not.toBeInTheDocument();
    });
    test("Clicking delete question removes the question", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const deleteButton = screen.getAllByRole("button", {
            name: "Delete Question"
        })[0];
        deleteButton.click();
        const saveButton = screen.getByRole("button", { name: /Save/i });
        saveButton.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(screen.queryByText("What is 32 + 2?")).not.toBeInTheDocument();
    });
    test("Clicking add question opens the modal and creates the question", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const addQuestionButton = screen.getByRole("button", {
            name: "Add New Question"
        });
        addQuestionButton.click();
        expect(
            screen.getByText("Question ID (default questions end at 6):")
        ).toBeInTheDocument();
        const saveChangesButton = screen.getByRole("button", {
            name: "Save New Question"
        });
        saveChangesButton.click();
        const inputBox = screen.getAllByRole("textbox");
        userEvent.type(inputBox[18], "new question name");
        const saveChanges2Button = screen.getByRole("button", {
            name: "Save"
        });
        saveChanges2Button.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(screen.queryByText("new question name")).toBeInTheDocument();
    });
    test("Clicking add quiz opens the modal and creates the quiz", () => {
        const addQuizButton = screen.getByRole("button", {
            name: "Add New Quiz"
        });
        addQuizButton.click();
        expect(
            screen.getByText("Quiz ID: (default quizzes are IDs 1 and 2)")
        ).toBeInTheDocument();
        const saveChangesButton = screen.getByRole("button", {
            name: "Save New Quiz"
        });
        saveChangesButton.click();
        expect(screen.getByText("Number of Questions: 0")).toBeInTheDocument();
    });
    test("Editing a question actually edits the question", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const questionName = screen.getByDisplayValue("Question 1");
        userEvent.type(questionName, ": EXTREMELY DIFFICULT");
        const questionBody = screen.getByDisplayValue("What is 32 + 2?");
        userEvent.type(questionBody, ": Additional Details");
        const saveChangesButton = screen.getByRole("button", {
            name: "Save"
        });
        saveChangesButton.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(
            screen.getByText("Question 1: EXTREMELY DIFFICULT")
        ).toBeInTheDocument();
        expect(
            screen.getByText("What is 32 + 2?: Additional Details")
        ).toBeInTheDocument();
    });
});
