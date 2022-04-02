import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import { Quiz } from "../quizzer_interfaces/Quiz";
import premadeQuizzes from "../data/quizzer.json";
import userEvent from "@testing-library/user-event";
import { Question } from "../quizzer_interfaces/question";

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
        const saveButton = screen.getByRole("button", { name: "Save Quiz" });
        expect(saveButton).toBeInTheDocument();
        const deleteButton = screen.getByRole("button", {
            name: "Delete Quiz"
        });
        expect(deleteButton).toBeInTheDocument();
    });
    test("Editing Quiz Title & Description changes Quiz Title & Description", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const titlebox = screen.getByDisplayValue("Math Quiz");
        userEvent.type(titlebox, " Addition");
        const descriptionbox = screen.getByDisplayValue(
            "A quick quiz with math questions."
        );
        userEvent.type(descriptionbox, " Addition");
        const saveButton = screen.getByRole("button", { name: /Save/i });
        saveButton.click();
        expect(screen.getByText("Math Quiz Addition")).toBeInTheDocument();
        expect(
            screen.getByText("A quick quiz with math questions. Addition")
        ).toBeInTheDocument();
    });
    test("Clicking delete removes the quiz", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const deleteButton = screen.getByRole("button", {
            name: "Delete Quiz"
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
            name: "Save Quiz"
        });
        saveChanges2Button.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(screen.queryByText("new question name")).toBeInTheDocument();
    });
    test("Clicking add question opens the modal and creates the question with id", () => {
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
        const questionID = screen.getByDisplayValue("7");
        userEvent.type(questionID, "350");
        const saveChangesButton = screen.getByRole("button", {
            name: "Save New Question"
        });
        saveChangesButton.click();
        const saveChanges2Button = screen.getByRole("button", {
            name: "Save Quiz"
        });
        saveChanges2Button.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        expect(screen.getByText("ID: 7350")).toBeInTheDocument();
        const inputBox = screen.getAllByRole("textbox");
        userEvent.type(inputBox[18], "new question name");
    });
    test("Clicking add quiz opens the modal and creates the quiz with the ID", () => {
        const addQuizButton = screen.getByRole("button", {
            name: "Add New Quiz"
        });
        addQuizButton.click();
        expect(
            screen.getByText("Quiz ID: (default quizzes are IDs 1 and 2)")
        ).toBeInTheDocument();
        const questionID = screen.getByDisplayValue("3");
        userEvent.type(questionID, "350");
        const saveChangesButton = screen.getByRole("button", {
            name: "Save New Quiz"
        });
        saveChangesButton.click();
        expect(screen.getByText("ID: 3350")).toBeInTheDocument();
        expect(screen.getByText("Number of Questions: 0")).toBeInTheDocument();
    });
    test("Creating a new quiz with used ID does not create new quiz", () => {
        const addQuizButton = screen.getByRole("button", {
            name: "Add New Quiz"
        });
        addQuizButton.click();
        expect(
            screen.getByText("Quiz ID: (default quizzes are IDs 1 and 2)")
        ).toBeInTheDocument();
        const quizID = screen.getByDisplayValue("3");
        userEvent.type(quizID, "{selectall}{delete}");
        userEvent.type(quizID, "1");
        const saveChangesButton = screen.getByRole("button", {
            name: "Save New Quiz"
        });
        saveChangesButton.click();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("Math Quiz")).toBeInTheDocument();
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
            name: "Save Quiz"
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
    test("Unpublishing a question & filtering hides the question", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const publishSwitches = screen.getAllByTestId("publishedSwitch");
        publishSwitches[0].click();
        const saveChangesButton = screen.getByRole("button", {
            name: "Save Quiz"
        });
        saveChangesButton.click();
        const openCloseButton = screen.getAllByRole("button", {
            name: /Close Quiz/i
        })[0];
        openCloseButton.click();
        const filterButton = screen.getAllByRole("button", {
            name: "Filter Published/Unpublished"
        })[0];
        filterButton.click();
        expect(screen.queryByText("Question 1")).not.toBeInTheDocument();
    });
    test("Moving questions up and down works", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Mode/i
        })[0];
        editButton.click();
        const moveUpButton = screen.getAllByRole("button", {
            name: "Move Question Up"
        });
        const moveDownButton = screen.getAllByRole("button", {
            name: "Move Question Down"
        });
        moveDownButton[0].click();
        moveUpButton[2].click();
        const saveButton = screen.getByRole("button", {
            name: "Save Quiz"
        });
        saveButton.click();
        const openButton = screen.getAllByRole("button", {
            name: "Open/Close Quiz"
        })[0];
        openButton.click();
        const questionNames = screen.getAllByTestId("question-name");
        expect(questionNames[0].textContent).toBe("Question 2");
        expect(questionNames[1].textContent).toBe("Question 3");
        expect(questionNames[2].textContent).toBe("Question 1");
    });
    test("Moving questions up and down works", () => {
        const openButton = screen.getAllByRole("button", {
            name: "Open/Close Quiz"
        })[0];
        openButton.click();
        const inputBox = screen.getAllByRole("textbox");
        userEvent.type(inputBox[0], "34");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.getByText("Current Points: 4")).toBeInTheDocument();
        userEvent.type(inputBox[0], "{selectall}{delete}");
        expect(screen.getByText("Current Points: 0")).toBeInTheDocument();
        const select = screen.getAllByRole("combobox");
        userEvent.selectOptions(select[0], "False");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        expect(screen.getByText("Current Points: 4")).toBeInTheDocument();
    });
});
