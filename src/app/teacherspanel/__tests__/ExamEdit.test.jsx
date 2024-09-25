import { render, screen, fireEvent, act } from "@testing-library/react";
import ExamDetails from "../Exam/EditExam/[id]/page";
import { fetchExamById, updateExamData } from "../../../../api/examapi";

jest.mock("../../../../api/examapi");

describe("ExamDetails Component", () => {
    const mockExamData = {
        type: "Midterm",
        examTitle: "Math Exam",
        subject: "Mathematics",
        date: "2023-08-20",
        startTime: "10:00 AM",
        duration: "2 hours",
        instruction: "Bring calculators",
        totalMarks: "100",
        passingMarks: "40",
        uploadQuestionPaper: "question-paper.pdf",
    };

    beforeEach(async () => {
        fetchExamById.mockResolvedValue(mockExamData);
        await act(async () => {
            render(<ExamDetails params={{ id: "1" }} />);
        });
    });

    test("renders the form with prefilled data", async () => {
        expect(screen.getByLabelText(/Type/i).value).toBe(mockExamData.type);
        expect(screen.getByLabelText(/Exam Title/i).value).toBe(mockExamData.examTitle);
        expect(screen.getByLabelText(/Subject/i).value).toBe(mockExamData.subject);
        expect(screen.getByLabelText(/Date/i).value).toBe(mockExamData.date);
        expect(screen.getByLabelText(/Start Time/i).value).toBe(mockExamData.startTime);
        expect(screen.getByLabelText(/Duration/i).value).toBe(mockExamData.duration);
        expect(screen.getByLabelText(/Instruction/i).value).toBe(mockExamData.instruction);
        expect(screen.getByLabelText(/Total Marks/i).value).toBe(mockExamData.totalMarks);
        expect(screen.getByLabelText(/Passing Marks/i).value).toBe(mockExamData.passingMarks);
    });

    test("allows updating form fields and submitting the form", async () => {
        const updatedExamData = {
            ...mockExamData,
            type: "Final",
            examTitle: "Final Math Exam",
        };

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Type/i), {
                target: { value: updatedExamData.type },
            });
            fireEvent.change(screen.getByLabelText(/Exam Title/i), {
                target: { value: updatedExamData.examTitle },
            });
            fireEvent.click(screen.getByText(/Submit/i));
        });

        expect(updateExamData).toHaveBeenCalledWith("1", expect.objectContaining(updatedExamData));
    });

    test("handles file input change", async () => {
        const file = new File(["sample"], "sample.pdf", { type: "application/pdf" });

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Upload Question Paper/i), {
                target: { files: [file] },
            });
        });

        // Check if file input has been updated correctly
        const fileInput = screen.getByLabelText(/Upload Question Paper/i);
        expect(fileInput.files[0].name).toBe("sample.pdf");
    });

    test("shows success message after successful form submission", async () => {
        updateExamData.mockResolvedValue({});

        await act(async () => {
            fireEvent.click(screen.getByText(/Submit/i));
        });

        expect(screen.getByText(/Exam added successfully!/i)).toBeInTheDocument();
    });


});
