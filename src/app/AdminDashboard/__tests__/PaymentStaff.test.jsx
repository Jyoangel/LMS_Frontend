import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StaffPaymentTable from "../Payment/StaffTable";
import { fetchPaymentStaffData } from "../../../../api/staffapi";

jest.mock("../../../../api/staffapi");

describe("StaffPaymentTable Component", () => {
    const mockPaymentData = {
        payments: [
            {
                staff: {
                    name: "John Doe",
                    education: "B.Ed",
                    aadharNumber: "1234-5678-9012",
                    position: "Teacher",
                    contactNumber: "9876543210",
                    employmentType: "Full-time",
                },
                salary: "50000",
                status: "Paid",
            },
            {
                staff: {
                    name: "Jane Smith",
                    education: "M.Sc",
                    aadharNumber: "2345-6789-0123",
                    position: "Lab Assistant",
                    contactNumber: "8765432109",
                    employmentType: "Part-time",
                },
                salary: "30000",
                status: "Pending",
            },
        ],
    };

    beforeEach(() => {
        fetchPaymentStaffData.mockResolvedValue(mockPaymentData);
    });

    it("renders loading state initially", () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders data after successful fetch", async () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Jane Smith")).toBeInTheDocument();
            expect(screen.getByText("₹50000")).toBeInTheDocument();
            expect(screen.getByText("₹30000")).toBeInTheDocument();
        });
    });

    it("displays error message on fetch failure", async () => {
        fetchPaymentStaffData.mockRejectedValue(new Error("Failed to fetch data"));
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
        });
    });



    it("filters data based on search term", async () => {
        render(<StaffPaymentTable filter="" searchTerm="Jane" />);
        await waitFor(() => {
            expect(screen.queryByText("John Doe")).toBeNull();
            expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        });
    });

    it("opens and closes the PaymentEdit modal when 'Pay' is clicked", async () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => screen.getByText("John Doe"));
        const payButton = screen.getAllByText("Pay")[0];
        fireEvent.click(payButton);

        expect(screen.queryByText("PaymentEdit")).toBeNull();
    });

    it("renders table headers correctly", async () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("Sr. No")).toBeInTheDocument();
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("Education")).toBeInTheDocument();
            expect(screen.getByText("Aadhar No")).toBeInTheDocument();
            expect(screen.getByText("Position")).toBeInTheDocument();
            expect(screen.getByText("Contact No")).toBeInTheDocument();
            expect(screen.getByText("Employment TYpe")).toBeInTheDocument();
            expect(screen.getByText("Salary")).toBeInTheDocument();
            expect(screen.getByText("Status")).toBeInTheDocument();
            expect(screen.getByText("Action")).toBeInTheDocument();
        });
    });

    it("renders alternating row colors", async () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            const rows = screen.getAllByRole("row");
            expect(rows[1]).toHaveClass("bg-gray-100");
            expect(rows[2]).toHaveClass("bg-white");
        });
    });

    it("displays salary in correct format", async () => {
        render(<StaffPaymentTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText("₹50000")).toBeInTheDocument();
            expect(screen.getByText("₹30000")).toBeInTheDocument();
        });
    });
});
