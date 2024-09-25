import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeacherManagementTable from "../Communication/TeacherTable";
import { fetchTeacherData, deleteTeacherData } from "../../../../api/teacherapi";

// Mock the API functions
jest.mock("../../../../api/teacherapi");

describe("TeacherManagementTable Component", () => {
    const mockTeachers = {
        teachers: [
            {
                _id: "1",
                teacherID: "T001",
                name: "John Doe",
                subjectTaught: "Mathematics",
                dateOfBirth: "1980-01-01",
                gender: "Male",
                aadharNumber: "123456789012",
                parent: { fatherName: "Richard Doe" },
                contactNumber: "9876543210",
            },
            {
                _id: "2",
                teacherID: "T002",
                name: "Jane Smith",
                subjectTaught: "Science",
                dateOfBirth: "1985-05-05",
                gender: "Female",
                aadharNumber: "098765432109",
                parent: { fatherName: "Henry Smith" },
                contactNumber: "8765432109",
            },
        ],
    };

    beforeEach(() => {
        fetchTeacherData.mockResolvedValue(mockTeachers);
        deleteTeacherData.mockResolvedValue({});
    });

    it("displays loading message while data is being fetched", async () => {
        fetchTeacherData.mockReturnValue(new Promise(() => { })); // Never resolves
        render(<TeacherManagementTable filter="" searchTerm="" />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays an error message if data fetching fails", async () => {
        fetchTeacherData.mockRejectedValue(new Error("Failed to fetch"));
        render(<TeacherManagementTable filter="" searchTerm="" />);

        await waitFor(() =>
            expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument()
        );
    });

    it("displays teacher data correctly", async () => {
        render(<TeacherManagementTable filter="" searchTerm="" />);

        await waitFor(() =>
            expect(screen.getByText("John Doe")).toBeInTheDocument()
        );
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText("Mathematics")).toBeInTheDocument();
        expect(screen.getByText("Science")).toBeInTheDocument();
    });












});
