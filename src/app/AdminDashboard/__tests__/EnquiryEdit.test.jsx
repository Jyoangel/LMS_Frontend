

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditEnquiry from "../Enquiry/EditEnquiry/[id]/page";
import { fetchEnquiryById, updateEnquiryData } from "../../../../api/enquiryapi";

// Mock the Next.js useRouter hook
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock the fetchEnquiryById and updateEnquiryData functions
jest.mock("../../../../api/enquiryapi", () => ({
    fetchEnquiryById: jest.fn(),
    updateEnquiryData: jest.fn(),
}));

describe("EditEnquiry Component", () => {
    const enquiryData = {
        name: "John Doe",
        contactNumber: "1234567890",
        email: "john@example.com",
        enquiryRelated: "General enquiry",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        fetchEnquiryById.mockResolvedValueOnce(enquiryData);

        render(<EditEnquiry params={{ id: "1" }} />);

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
        });
    });

    test("renders error message on fetch failure", async () => {
        fetchEnquiryById.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<EditEnquiry params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
        });
    });

    test("renders form with prefilled data", async () => {
        fetchEnquiryById.mockResolvedValueOnce(enquiryData);

        render(<EditEnquiry params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(enquiryData.name)).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(enquiryData.contactNumber)
            ).toBeInTheDocument();
            expect(screen.getByDisplayValue(enquiryData.email)).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(enquiryData.enquiryRelated)
            ).toBeInTheDocument();
        });
    });

    test("updates form fields on user input", async () => {
        fetchEnquiryById.mockResolvedValueOnce(enquiryData);

        render(<EditEnquiry params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(enquiryData.name)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: "Jane Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Contact Number/i), {
            target: { value: "0987654321" },
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: "jane@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Enquiry Related/i), {
            target: { value: "Updated enquiry" },
        });

        expect(screen.getByDisplayValue("Jane Doe")).toBeInTheDocument();
        expect(screen.getByDisplayValue("0987654321")).toBeInTheDocument();
        expect(screen.getByDisplayValue("jane@example.com")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Updated enquiry")).toBeInTheDocument();
    });

    test("submits form data and shows success modal", async () => {
        fetchEnquiryById.mockResolvedValueOnce(enquiryData);
        updateEnquiryData.mockResolvedValueOnce({ success: true });

        render(<EditEnquiry params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(enquiryData.name)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(updateEnquiryData).toHaveBeenCalledWith("1", enquiryData);
            expect(
                screen.getByText(/Enquiry updated successfully!/i)
            ).toBeInTheDocument();
        });
    });

    test("shows error message on update failure", async () => {
        fetchEnquiryById.mockResolvedValueOnce(enquiryData);
        updateEnquiryData.mockRejectedValueOnce(new Error("Update failed"));

        render(<EditEnquiry params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(enquiryData.name)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(updateEnquiryData).toHaveBeenCalledWith("1", enquiryData);
            expect(screen.getByText(/Error: Update failed/i)).toBeInTheDocument();
        });
    });


});

