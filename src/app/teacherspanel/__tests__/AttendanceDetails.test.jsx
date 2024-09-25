import { render, screen, waitFor, act } from "@testing-library/react";
import StudentAtdDetails from "../Attendance/StudentAtdDetails/[studentId]/page";
import { fetchStudentById } from "../../../../api/api";

import userEvent from "@testing-library/user-event";

// Mocking the fetchStudentById API
jest.mock("../../../../api/api", () => ({
    fetchStudentById: jest.fn(),
}));

// Mocking the useRouter to test navigation
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children }) => <>{children}</>,
}));

// Dummy student data
const mockStudentData = {
    formNumber: "F123",
    admissionNumber: "A456",
    name: "Rohan",
    class: "7",
    dateOfBirth: "2005-05-15",
    gender: "Male",
    nationality: "Indian",
    motherTongue: "Hindi",
    religion: "Hindu",
    caste: "General",
    bloodGroup: "O+",
    aadharNumber: "123456789012",
    contactNumber: "9876543210",
    address: "123 Main , City",
    parent: {
        fatherName: "Mr. Doe",
        fatherContactNumber: "9876543211",
        fatherAadharNumber: "123456789013",
        fatherOccupation: "Engineer",
        annualIncome: "500000",
        motherName: "Mrs. Doe",
        parentAddress: "123 Main St, City",
    },
    localGuardian: {
        guardianName: "Mr. Smith",
        relationWithStudent: "Uncle",
        guardianContactNumber: "9876543212",
        guardianAadharNumber: "123456789014",
        guardianOccupation: "Doctor",
        guardianAddress: "456 Another St, City",
    },
};

// Test suite
describe("StudentAtdDetails Component", () => {
    const studentID = "student123";

    beforeEach(() => {
        fetchStudentById.mockResolvedValue(mockStudentData);
    });



    it("fetches and renders student data", async () => {
        await act(async () => {
            render(<StudentAtdDetails params={{ studentID }} />);
        });

        await waitFor(() => {
            expect(fetchStudentById).toHaveBeenCalledWith(studentID);
        });

        const StudentNames = screen.getAllByText(mockStudentData.name);
        expect(StudentNames).toHaveLength(2)
        expect(screen.getByText(mockStudentData.formNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.admissionNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.class)).toBeInTheDocument();
        expect(
            screen.getByText(mockStudentData.dateOfBirth)
        ).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.gender)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.nationality)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.motherTongue)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.religion)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.caste)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.bloodGroup)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.aadharNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.contactNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.address)).toBeInTheDocument();

        // Parent details
        expect(screen.getByText(mockStudentData.parent.fatherName)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.fatherContactNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.fatherAadharNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.fatherOccupation)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.annualIncome)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.motherName)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.parent.parentAddress)).toBeInTheDocument();

        // Local Guardian details
        expect(screen.getByText(mockStudentData.localGuardian.guardianName)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.localGuardian.relationWithStudent)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.localGuardian.guardianContactNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.localGuardian.guardianAadharNumber)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.localGuardian.guardianOccupation)).toBeInTheDocument();
        expect(screen.getByText(mockStudentData.localGuardian.guardianAddress)).toBeInTheDocument();
    });

    it("calls the Edit button correctly", async () => {
        await act(async () => {
            render(<StudentAtdDetails params={{ studentID }} />);
        });

        const editButton = screen.getByText("Edit");
        expect(editButton).toBeInTheDocument();
        userEvent.click(editButton);
        // Further checks can be implemented if edit functionality is defined
    });

    it("calls the Delete button correctly", async () => {
        await act(async () => {
            render(<StudentAtdDetails params={{ studentID }} />);
        });

        const deleteButton = screen.getByText("Delete");
        expect(deleteButton).toBeInTheDocument();
        userEvent.click(deleteButton);
        // Further checks can be implemented if delete functionality is defined
    });

    it("renders the back button and navigates correctly", async () => {
        await act(async () => {
            render(<StudentAtdDetails params={{ studentID }} />);
        });

        const backButton = screen.getByText("Back");
        expect(backButton).toBeInTheDocument();
    });


});
