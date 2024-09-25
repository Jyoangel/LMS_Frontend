import { render, screen, fireEvent, act } from "@testing-library/react";
import ExamTable from "../Exam/ExamTable";
import { fetchExamData } from "../../../../api/examapi";


// Mocking the fetchExamData function
jest.mock("../../../../api/examapi");

const mockExamData = {
    exams: [
        {
            examTitle: "Math Final",
            subject: "Mathematics",
            date: "2024-08-15",
            startTime: "09:00 AM",
            totalMarks: 100,
            passingMarks: 40,
        },
        {
            examTitle: "Science Midterm",
            subject: "Science",
            date: "2024-08-20",
            startTime: "11:00 AM",
            totalMarks: 100,
            passingMarks: 35,
        },
    ],
};

describe("ExamTable Component", () => {
    beforeEach(() => {
        fetchExamData.mockResolvedValue(mockExamData);
    });

    test("renders table headers correctly", async () => {
        await act(async () => {
            render(<ExamTable />);
        })
        expect(screen.getByText("Sr. No")).toBeInTheDocument();
        expect(screen.getByText("Exam Title")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Exam Date")).toBeInTheDocument();
        expect(screen.getByText("Start Time")).toBeInTheDocument();
        expect(screen.getByText("Total Marks")).toBeInTheDocument();
        expect(screen.getByText("Passing Marks")).toBeInTheDocument();
        expect(screen.getByText("Created By")).toBeInTheDocument();
    });







    test("formats date correctly", async () => {
        render(<ExamTable filter="" searchTerm="" />);

        const dateElement = await screen.findByText("2024-08-15");
        expect(dateElement).toBeInTheDocument();
        expect(dateElement.textContent).toBe("2024-08-15");
    });

    test("correctly handles empty data", async () => {
        fetchExamData.mockResolvedValueOnce({ exams: [] });
        render(<ExamTable filter="" searchTerm="" />);

        const rows = await screen.findAllByRole("row");
        expect(rows).toHaveLength(1); // Only header row
    });

    test("displays a link for exam titles", async () => {
        render(<ExamTable filter="" searchTerm="" />);

        const examLink = await screen.findByText("Math Final");
        expect(examLink).toHaveAttribute("href", "/AdminDashboard/LiveClassScreen/CourseName");
    });


});
