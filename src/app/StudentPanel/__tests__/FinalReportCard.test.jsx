import { render, screen, fireEvent, act } from "@testing-library/react";
import FinalReportCard from "../ReportCard/FinalReportCard/[id]/page";
import { fetchReportCardById } from "../../../../api/reportcardapi";
import { useRouter } from "next/router";
import format from "date-fns/format";

// Mocking fetchReportCardById and useRouter
jest.mock("../../../../api/reportcardapi", () => ({
    fetchReportCardById: jest.fn(),
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props) => <img {...props} />, // Mock the Image component
}));

describe("FinalReportCard Component", () => {
    const mockReportCard = {
        rollNumber: "12345",
        session: "2023-2024",
        name: "John Doe",
        percentage: "85%",
        dateOfBirth: "2005-08-15",
        type: "Final Exam",
        class: "10th Grade",
        status: "Pass",
        subjects: [
            { subjectName: "Math", marks: 90 },
            { subjectName: "Science", marks: 85 },
            { subjectName: "English", marks: 80 },
        ],
    };

    beforeEach(() => {
        fetchReportCardById.mockResolvedValue(mockReportCard);
        useRouter.mockReturnValue({
            push: jest.fn(),
            query: { id: "1" },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the report card data correctly", async () => {
        await act(async () => {
            render(<FinalReportCard params={{ id: "1" }} />);
        });

        expect(screen.getByText("Examination Roll Number:")).toBeInTheDocument();
        expect(screen.getByText(mockReportCard.rollNumber)).toBeInTheDocument();
        expect(screen.getByText("Session:")).toBeInTheDocument();
        expect(screen.getByText(mockReportCard.session)).toBeInTheDocument();
        expect(screen.getByText("Student Name:")).toBeInTheDocument();
        expect(screen.getByText(mockReportCard.name)).toBeInTheDocument();
        expect(screen.getByText("Percentage:")).toBeInTheDocument();
        expect(screen.getByText(mockReportCard.percentage)).toBeInTheDocument();
        expect(screen.getByText("Date of Birth:")).toBeInTheDocument();
        expect(screen.getByText('2005-08-15')).toBeInTheDocument();
    });

    test("renders the subjects and marks correctly", async () => {
        await act(async () => {
            render(<FinalReportCard params={{ id: "1" }} />);
        });

        mockReportCard.subjects.forEach((subject, index) => {
            expect(screen.getByText(subject.subjectName)).toBeInTheDocument();
            expect(screen.getByText(subject.marks)).toBeInTheDocument();
        });
    });

    test("handles download button click", async () => {
        await act(async () => {
            render(<FinalReportCard params={{ id: "1" }} />);
        });

        const downloadButton = screen.getByText("Download Report Card");

        expect(downloadButton).toBeInTheDocument();

        fireEvent.click(downloadButton);

        // You can add further checks if you mock the jsPDF and html2canvas libraries
    });
});
