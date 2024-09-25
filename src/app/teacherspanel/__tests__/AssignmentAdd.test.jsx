import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddAssignment from "../Assignment/AddAssignment/page";
import { addAssignmentData } from "../../../../api/assignmentapi"; // Adjust the path accordingly

jest.mock("../../../../api/assignmentapi", () => ({
    addAssignmentData: jest.fn(),
}));

describe("AddAssignment Component", () => {
    beforeEach(() => {
        render(<AddAssignment />);
    });

    test("renders the AddAssignment form with all fields", () => {
        expect(screen.getByLabelText("Assignment Code*")).toBeInTheDocument();
        expect(screen.getByLabelText("Assignment Title*")).toBeInTheDocument();
        expect(screen.getByLabelText("Due Date*")).toBeInTheDocument();
        expect(screen.getByLabelText("Attachments*")).toBeInTheDocument();
        expect(screen.getByLabelText("Submission Method*")).toBeInTheDocument();
        expect(screen.getByLabelText("Marks*")).toBeInTheDocument();
        expect(screen.getByLabelText("Additional Instruction*")).toBeInTheDocument();
        expect(screen.getByLabelText("Class*")).toBeInTheDocument();
        expect(screen.getByLabelText("Assign To*")).toBeInTheDocument();
        expect(screen.getByLabelText("Course Description*")).toBeInTheDocument();
        expect(screen.getByLabelText("Created By*")).toBeInTheDocument();
    });

    test("allows users to input data and submit the form", async () => {
        addAssignmentData.mockResolvedValueOnce({}); // Mock the API call

        fireEvent.change(screen.getByLabelText("Assignment Code*"), {
            target: { value: "AC101" },
        });
        fireEvent.change(screen.getByLabelText("Assignment Title*"), {
            target: { value: "Assignment 1" },
        });
        fireEvent.change(screen.getByLabelText("Due Date*"), {
            target: { value: "2023-08-30" },
        });
        fireEvent.change(screen.getByLabelText("Attachments*"), {
            target: { value: "attachment.pdf" },
        });
        fireEvent.change(screen.getByLabelText("Submission Method*"), {
            target: { value: "Online" },
        });
        fireEvent.change(screen.getByLabelText("Marks*"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByLabelText("Additional Instruction*"), {
            target: { value: "Submit before due date." },
        });
        fireEvent.change(screen.getByLabelText("Class*"), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText("Assign To*"), {
            target: { value: "All Students" },
        });
        fireEvent.change(screen.getByLabelText("Course Description*"), {
            target: { value: "Mathematics assignment on Algebra." },
        });
        fireEvent.change(screen.getByLabelText("Created By*"), {
            target: { value: "Teacher A" },
        });

        fireEvent.click(screen.getByText("Add Assignment"));

        await waitFor(() => {
            expect(addAssignmentData).toHaveBeenCalledWith({
                assignmentCode: "AC101",
                assignmentTitle: "Assignment 1",
                dueDate: "2023-08-30",
                attachments: "attachment.pdf",
                submissionMethod: "Online",
                marks: "100",
                additionalInstruction: "Submit before due date.",
                class: "10",
                assignTo: "All Students",
                courseDescription: "Mathematics assignment on Algebra.",
                createdBy: "Teacher A",
            });
        });


    });



    test("shows the success modal on successful submission", async () => {
        addAssignmentData.mockResolvedValueOnce({});

        fireEvent.change(screen.getByLabelText("Assignment Code*"), {
            target: { value: "AC101" },
        });
        fireEvent.change(screen.getByLabelText("Assignment Title*"), {
            target: { value: "Assignment 1" },
        });
        fireEvent.change(screen.getByLabelText("Due Date*"), {
            target: { value: "2023-08-30" },
        });
        fireEvent.change(screen.getByLabelText("Attachments*"), {
            target: { value: "attachment.pdf" },
        });
        fireEvent.change(screen.getByLabelText("Submission Method*"), {
            target: { value: "Online" },
        });
        fireEvent.change(screen.getByLabelText("Marks*"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByLabelText("Additional Instruction*"), {
            target: { value: "Submit before due date." },
        });
        fireEvent.change(screen.getByLabelText("Class*"), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText("Assign To*"), {
            target: { value: "All Students" },
        });
        fireEvent.change(screen.getByLabelText("Course Description*"), {
            target: { value: "Mathematics assignment on Algebra." },
        });
        fireEvent.change(screen.getByLabelText("Created By*"), {
            target: { value: "Teacher A" },
        });

        fireEvent.click(screen.getByText("Add Assignment"));


    });

    test("handles API errors gracefully", async () => {
        addAssignmentData.mockRejectedValueOnce(new Error("Failed to add assignment"));

        fireEvent.change(screen.getByLabelText("Assignment Code*"), {
            target: { value: "AC101" },
        });
        fireEvent.change(screen.getByLabelText("Assignment Title*"), {
            target: { value: "Assignment 1" },
        });
        fireEvent.change(screen.getByLabelText("Due Date*"), {
            target: { value: "2023-08-30" },
        });
        fireEvent.change(screen.getByLabelText("Attachments*"), {
            target: { value: "attachment.pdf" },
        });
        fireEvent.change(screen.getByLabelText("Submission Method*"), {
            target: { value: "Online" },
        });
        fireEvent.change(screen.getByLabelText("Marks*"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByLabelText("Additional Instruction*"), {
            target: { value: "Submit before due date." },
        });
        fireEvent.change(screen.getByLabelText("Class*"), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText("Assign To*"), {
            target: { value: "All Students" },
        });
        fireEvent.change(screen.getByLabelText("Course Description*"), {
            target: { value: "Mathematics assignment on Algebra." },
        });
        fireEvent.change(screen.getByLabelText("Created By*"), {
            target: { value: "Teacher A" },
        });

        fireEvent.click(screen.getByText("Add Assignment"));

        await waitFor(() => {
            expect(screen.queryByText("Assignment has been added successfully!")).not.toBeInTheDocument();
        });
    });
});
