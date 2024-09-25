import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTranspotation from "../Transpotation/EditTranspotation/[id]/page";
import { fetchTranspotationById, updateTranspotationData } from "../../../../api/transpotationapi";
import { useRouter } from "next/router";

// Mock the router
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

// Mock the API functions
jest.mock("../../../../api/transpotationapi", () => ({
    fetchTranspotationById: jest.fn(),
    updateTranspotationData: jest.fn(),
}));

describe("EditTranspotation Component", () => {
    const mockData = {
        studentName: "John Doe",
        class: "5",
        rollNo: "123",
        fatherName: "Mr. Doe",
        fatherContactNumber: "1234567890",
        pickupLocation: "Location A",
        dropLocation: "Location B",
        transportationFee: "1000",
    };

    beforeEach(() => {
        // Mock the useRouter hook
        useRouter.mockReturnValue({
            push: jest.fn(),
        });
    });

    test("renders loading state initially", async () => {
        fetchTranspotationById.mockResolvedValueOnce(mockData);
        render(<EditTranspotation params={{ id: "1" }} />);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test("renders error state on fetch failure", async () => {
        fetchTranspotationById.mockRejectedValueOnce(new Error("Failed to fetch data"));
        render(<EditTranspotation params={{ id: "1" }} />);

        await waitFor(() => expect(screen.getByText(/error: failed to fetch data/i)).toBeInTheDocument());
    });

    test("renders form fields with fetched data", async () => {
        fetchTranspotationById.mockResolvedValueOnce(mockData);
        render(<EditTranspotation params={{ id: "1" }} />);

        await waitFor(() => {
            expect(screen.getByLabelText(/student name/i)).toHaveValue(mockData.studentName);
            expect(screen.getByLabelText(/class/i)).toHaveValue(mockData.class);
            expect(screen.getByLabelText(/roll no/i)).toHaveValue(mockData.rollNo);
            expect(screen.getByLabelText(/father name/i)).toHaveValue(mockData.fatherName);
            expect(screen.getByLabelText(/father contact number/i)).toHaveValue(mockData.fatherContactNumber);
            expect(screen.getByLabelText(/pickup location/i)).toHaveValue(mockData.pickupLocation);
            expect(screen.getByLabelText(/drop location/i)).toHaveValue(mockData.dropLocation);
            expect(screen.getByLabelText(/transportation fee/i)).toHaveValue(mockData.transportationFee);
        });
    });

    test("updates input values on change", async () => {
        fetchTranspotationById.mockResolvedValueOnce(mockData);
        render(<EditTranspotation params={{ id: "1" }} />);

        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/student name/i), { target: { value: "Jane Doe" } });
            fireEvent.change(screen.getByLabelText(/class/i), { target: { value: "6" } });
            fireEvent.change(screen.getByLabelText(/roll no/i), { target: { value: "124" } });
            fireEvent.change(screen.getByLabelText(/father name/i), { target: { value: "Mr. Smith" } });
            fireEvent.change(screen.getByLabelText(/father contact number/i), { target: { value: "0987654321" } });
            fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: "Location X" } });
            fireEvent.change(screen.getByLabelText(/drop location/i), { target: { value: "Location Y" } });
            fireEvent.change(screen.getByLabelText(/transportation fee/i), { target: { value: "1500" } });
        });

        expect(screen.getByLabelText(/student name/i)).toHaveValue("Jane Doe");
        expect(screen.getByLabelText(/class/i)).toHaveValue("6");
        expect(screen.getByLabelText(/roll no/i)).toHaveValue("124");
        expect(screen.getByLabelText(/father name/i)).toHaveValue("Mr. Smith");
        expect(screen.getByLabelText(/father contact number/i)).toHaveValue("0987654321");
        expect(screen.getByLabelText(/pickup location/i)).toHaveValue("Location X");
        expect(screen.getByLabelText(/drop location/i)).toHaveValue("Location Y");
        expect(screen.getByLabelText(/transportation fee/i)).toHaveValue("1500");
    });

    test("submits the form and shows success modal", async () => {
        fetchTranspotationById.mockResolvedValueOnce(mockData);
        updateTranspotationData.mockResolvedValueOnce({ success: true });
        render(<EditTranspotation params={{ id: "1" }} />);

        await waitFor(() => {
            fireEvent.click(screen.getByRole("button", { name: /update/i }));
        });

        await waitFor(() => {
            expect(updateTranspotationData).toHaveBeenCalledWith("1", mockData);
            expect(screen.getByText(/transpotation updated successfully!/i)).toBeInTheDocument();
        });
    });

    test("shows error message on form submission failure", async () => {
        fetchTranspotationById.mockResolvedValueOnce(mockData);
        updateTranspotationData.mockRejectedValueOnce(new Error("Update failed"));
        render(<EditTranspotation params={{ id: "1" }} />);

        await waitFor(() => {
            fireEvent.click(screen.getByRole("button", { name: /update/i }));
        });

        await waitFor(() => {
            expect(screen.getByText(/error: update failed/i)).toBeInTheDocument();
        });
    });
});
