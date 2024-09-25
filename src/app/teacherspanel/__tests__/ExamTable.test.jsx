"use client";

import { render, screen, fireEvent, act } from "@testing-library/react";
import { fetchExamData, deleteExamData } from "../../../../api/examapi";
import ExamTable from "../Exam/ExamTable";


jest.mock("../../../../api/examapi");

const mockExamData = [
    {
        _id: "1",
        examTitle: "Math Exam",
        subject: "Mathematics",
        date: "2023-08-20",
        startTime: "10:00 AM",
        totalMarks: "100",
        passingMarks: "40",
        createdBy: "Teacher A",
        class: "Class 1",
        name: "Exam 1"
    },
    {
        _id: "2",
        examTitle: "Science Exam",
        subject: "Science",
        date: "2023-08-22",
        startTime: "11:00 AM",
        totalMarks: "100",
        passingMarks: "50",
        createdBy: "Teacher B",
        class: "Class 2",
        name: "Exam 2"
    }
];

describe("ExamTable Component", () => {
    beforeEach(() => {
        fetchExamData.mockResolvedValue({ exam: mockExamData });
    });

    test("renders exam data correctly", async () => {
        await act(async () => {
            render(<ExamTable filter="" searchTerm="" />);
        });

        expect(screen.getByText(/Math Exam/i)).toBeInTheDocument();
        expect(screen.getByText(/Science Exam/i)).toBeInTheDocument();
        expect(screen.getByText(/Mathematics/i)).toBeInTheDocument();

    });

    test("filters exams by class", async () => {
        await act(async () => {
            render(<ExamTable filter="Class 1" searchTerm="" />);
        });

        expect(screen.getByText(/Math Exam/i)).toBeInTheDocument();
        expect(screen.queryByText(/Science Exam/i)).toBeNull();
    });

    test("searches exams by name", async () => {
        await act(async () => {
            render(<ExamTable filter="" searchTerm="Exam 1" />);
        });

        expect(screen.getByText(/Math Exam/i)).toBeInTheDocument();
        expect(screen.queryByText(/Science Exam/i)).toBeNull();
    });

    test("opens and closes delete confirmation dialog", async () => {
        await act(async () => {
            render(<ExamTable filter="" searchTerm="" />);
        });

        const deleteButtons = screen.getAllByText(/Delete/i);

        // Click the first "Delete" button
        fireEvent.click(deleteButtons[0]);
        expect(screen.getByText(/Do you really want to delete this record?/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Cancel/i));
        expect(screen.queryByText(/Do you really want to delete this record?/i)).toBeNull();
    });

    test("handles delete confirmation", async () => {
        deleteExamData.mockResolvedValue({});
        await act(async () => {
            render(<ExamTable filter="" searchTerm="" />);
        });

        const deleteButtons = screen.getAllByText(/Delete/i);

        // Click the first "Delete" button
        fireEvent.click(deleteButtons[0]);

    });

    test("handles delete error", async () => {
        deleteExamData.mockRejectedValue(new Error("Failed to delete exam"));
        await act(async () => {
            render(<ExamTable filter="" searchTerm="" />);
        });

        // Find all "Delete" buttons
        const deleteButtons = screen.getAllByText(/Delete/i);

        // Click the first "Delete" button
        fireEvent.click(deleteButtons[0]);


    });



});
