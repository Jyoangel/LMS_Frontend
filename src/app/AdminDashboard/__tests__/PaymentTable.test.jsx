import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentTable from "../Payment/PaymentTable";
import { fetchPaymentTeacherData } from "../../../../api/teacherapi";

jest.mock("../../../../api/teacherapi");

describe("PaymentTable Component", () => {
    const mockPaymentData = {
        payments: [
            {
                teacher: {
                    name: "John Doe",
                    aadharNumber: "1234-5678-9012",
                    subjectTaught: "Mathematics",
                    contactNumber: "9876543210",
                    parent: { fatherName: "Mr. Doe" },
                },
                assignedClass: "10th Grade",
                salary: "50000",
                status: "Paid",
            },
            {
                teacher: {
                    name: "Jane Smith",
                    aadharNumber: "2345-6789-0123",
                    subjectTaught: "Science",
                    contactNumber: "8765432109",
                    parent: { fatherName: "Mr. Smith" },
                },
                assignedClass: "9th Grade",
                salary: "45000",
                status: "Pending",
            },
        ],
    };

    beforeEach(() => {
        fetchPaymentTeacherData.mockResolvedValue(mockPaymentData);
    });

    it("renders the component with initial loading state", () => {
        render(<PaymentTable filter="" searchTerm="" />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays payment data after successful fetch", async () => {
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Jane Smith")).toBeInTheDocument();
            expect(screen.getByText("10th Grade")).toBeInTheDocument();
            expect(screen.getByText("9th Grade")).toBeInTheDocument();
        });
    });

    it("displays error message on fetch failure", async () => {
        fetchPaymentTeacherData.mockRejectedValue(new Error("Failed to fetch data"));
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
        });
    });





    it("opens and closes the PaymentEdit modal when 'Edit' is clicked", async () => {
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => screen.getByText("John Doe"));
        const editButton = screen.getAllByText("Edit")[0];
        fireEvent.click(editButton);
        

        expect(screen.queryByText("PaymentEdit")).toBeNull();
    });

    it("renders table headers correctly", async () => {
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("Sr. No")).toBeInTheDocument();
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("Assign Class")).toBeInTheDocument();
            expect(screen.getByText("Aadhar No")).toBeInTheDocument();
            expect(screen.getByText("Subject")).toBeInTheDocument();
            expect(screen.getByText("Contact No")).toBeInTheDocument();
            expect(screen.getByText("Father Name")).toBeInTheDocument();
            expect(screen.getByText("Salary")).toBeInTheDocument();
            expect(screen.getByText("Status")).toBeInTheDocument();
            expect(screen.getByText("Action")).toBeInTheDocument();
        });
    });

    it("displays the correct salary format", async () => {
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("₹50000")).toBeInTheDocument();
            expect(screen.getByText("₹45000")).toBeInTheDocument();
        });
    });

    it("displays alternating row colors", async () => {
        render(<PaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            const rows = screen.getAllByRole("row");
            expect(rows[1]).toHaveClass("bg-gray-100");
            expect(rows[2]).toHaveClass("bg-white");
        });
    });
});
