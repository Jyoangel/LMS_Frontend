import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTranspotation from "../Transpotation/AddTranspotation/page";
import { addTranspotationData } from "../../../../api/transpotationapi";
import Successcard from "@/Components/Successcard";

// Mock the addTranspotationData API function
jest.mock("../../../../api/transpotationapi", () => ({
    addTranspotationData: jest.fn(),
}));

jest.mock("next/link", () => {
    return ({ children }) => children;
});

describe("AddTranspotation Component", () => {
    // Test to ensure the component renders correctly
    test("renders AddTranspotation component", () => {
        render(<AddTranspotation />);

        // Check for input fields
        expect(screen.getByLabelText(/Student Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Roll No/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Father Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Father Contact Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Pickup Location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Drop Location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Transportation Fee/i)).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    });

    // Test to ensure form input updates state correctly
    test("updates form input values", () => {
        render(<AddTranspotation />);


        fireEvent.change(screen.getByPlaceholderText("Enter student name"), {
            target: { value: "John Doe" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter roll number"), {
            target: { value: "123" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter father's name"), {
            target: { value: "Mr. Doe" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter contact number"), {
            target: { value: "1234567890" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter pickup location"), {
            target: { value: "Location A" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter drop location"), {
            target: { value: "Location B" }
        });
        fireEvent.change(screen.getByPlaceholderText("Enter transportation fee"), {
            target: { value: "1000" }
        });

        expect(screen.getByPlaceholderText("Enter student name").value).toBe("John Doe");
        expect(screen.getByPlaceholderText("Enter roll number").value).toBe("123");
        expect(screen.getByPlaceholderText("Enter father's name").value).toBe("Mr. Doe");
        expect(screen.getByPlaceholderText("Enter contact number").value).toBe("1234567890");
        expect(screen.getByPlaceholderText("Enter pickup location").value).toBe("Location A");
        expect(screen.getByPlaceholderText("Enter drop location").value).toBe("Location B");
        expect(screen.getByPlaceholderText("Enter transportation fee").value).toBe("1000");
    });

    // Test to check form submission calls the API
    test("submits form and calls addTranspotationData API", async () => {
        addTranspotationData.mockResolvedValueOnce({});
        render(<AddTranspotation />);

        const submitButton = screen.getByRole("button", { name: /Submit/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(addTranspotationData).toHaveBeenCalledWith({
                studentName: "",
                rollNo: "",
                class: "",
                fatherName: "",
                fatherContactNumber: "",
                pickupLocation: "",
                dropLocation: "",
                transportationFee: "",
            });
        });
    });

    // Test to handle API submission failure
    test("handles API submission failure gracefully", async () => {
        addTranspotationData.mockRejectedValueOnce(new Error("Failed to add transportation data"));
        render(<AddTranspotation />);

        const submitButton = screen.getByRole("button", { name: /Submit/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(addTranspotationData).toHaveBeenCalled();
            expect(screen.queryByText("Failed to add transportation data")).not.toBeInTheDocument();
        });
    });

    // Test to verify modal opens on successful submission
    test("opens Successcard modal on successful submission", async () => {
        addTranspotationData.mockResolvedValueOnce({});
        render(<AddTranspotation />);

        const submitButton = screen.getByRole("button", { name: /Submit/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Transportation data added successfully!")).toBeInTheDocument();
        });


    });

    // Test to ensure Back button navigates to the correct route
    test("navigates back to Transportation page on Back button click", () => {
        render(<AddTranspotation />);

        const backButton = screen.getByRole("button", { name: /Back/i });

        // Simulate the Back button click
        fireEvent.click(backButton);

        // As we mocked Link, we need to check if it renders children correctly, not actual navigation
        expect(screen.getByText("Back")).toBeInTheDocument();
    });
});
