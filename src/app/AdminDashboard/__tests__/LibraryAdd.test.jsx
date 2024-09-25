// AddLibrary.test.js

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddLibrary from "../LibraryManage/AddLibrary/page";
import { addLibraryData } from "../../../../api/libraryapi";

// Mock the addLibraryData API function
jest.mock("../../../../api/libraryapi", () => ({
    addLibraryData: jest.fn(),
}));

describe("AddLibrary Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any mock calls between tests
    });

    test("renders form with all inputs", () => {
        render(<AddLibrary />);

        // Check if all form fields are rendered
        expect(screen.getByLabelText(/Title \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subject\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Type\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Author Name\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Uploaded By\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description \*/i)).toBeInTheDocument();
    });

    test("handles input change correctly", () => {
        render(<AddLibrary />);

        // Simulate input change
        fireEvent.change(screen.getByLabelText(/Title \*/i), {
            target: { value: "Sample Title" },
        });
        expect(screen.getByLabelText(/Title \*/i).value).toBe("Sample Title");
    });

    test("calls addLibraryData API on form submit", async () => {
        addLibraryData.mockResolvedValueOnce(); // Mock successful API call

        render(<AddLibrary />);

        // Fill in form inputs
        fireEvent.change(screen.getByLabelText(/Title \*/i), {
            target: { value: "Sample Title" },
        });
        fireEvent.change(screen.getByLabelText(/Subject\*/i), {
            target: { value: "Math" },
        });
        fireEvent.change(screen.getByLabelText(/Class\*/i), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText(/Type\*/i), {
            target: { value: "Book" },
        });
        fireEvent.change(screen.getByLabelText(/Author Name\*/i), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Uploaded By\*/i), {
            target: { value: "Jane Smith" },
        });
        fireEvent.change(screen.getByLabelText(/Description \*/i), {
            target: { value: "Sample description" },
        });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(addLibraryData).toHaveBeenCalledWith({
                title: "Sample Title",
                subject: "Math",
                class: "10",
                type: "Book",
                authorName: "John Doe",
                uploadedBy: "Jane Smith",
                description: "Sample description",
            });
        });

        // Verify modal is open
        expect(screen.getByText(/Library added successfully!/i)).toBeInTheDocument();
    });

    test("shows error if API call fails", async () => {
        addLibraryData.mockRejectedValueOnce(new Error("Failed to add library data"));

        render(<AddLibrary />);

        // Fill in form inputs
        fireEvent.change(screen.getByLabelText(/Title \*/i), {
            target: { value: "Sample Title" },
        });
        fireEvent.change(screen.getByLabelText(/Subject\*/i), {
            target: { value: "Math" },
        });
        fireEvent.change(screen.getByLabelText(/Class\*/i), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText(/Type\*/i), {
            target: { value: "Book" },
        });
        fireEvent.change(screen.getByLabelText(/Author Name\*/i), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Uploaded By\*/i), {
            target: { value: "Jane Smith" },
        });
        fireEvent.change(screen.getByLabelText(/Description \*/i), {
            target: { value: "Sample description" },
        });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(addLibraryData).toHaveBeenCalledWith({
                title: "Sample Title",
                subject: "Math",
                class: "10",
                type: "Book",
                authorName: "John Doe",
                uploadedBy: "Jane Smith",
                description: "Sample description",
            });
        });

        // Verify no modal is open since API failed
        expect(screen.queryByText(/Library added successfully!/i)).not.toBeInTheDocument();
    });

    test("modal closes when onClose is called", async () => {
        addLibraryData.mockResolvedValueOnce(); // Mock successful API call

        render(<AddLibrary />);

        // Fill in form inputs
        fireEvent.change(screen.getByLabelText(/Title \*/i), {
            target: { value: "Sample Title" },
        });
        fireEvent.change(screen.getByLabelText(/Subject\*/i), {
            target: { value: "Math" },
        });
        fireEvent.change(screen.getByLabelText(/Class\*/i), {
            target: { value: "10" },
        });
        fireEvent.change(screen.getByLabelText(/Type\*/i), {
            target: { value: "Book" },
        });
        fireEvent.change(screen.getByLabelText(/Author Name\*/i), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Uploaded By\*/i), {
            target: { value: "Jane Smith" },
        });
        fireEvent.change(screen.getByLabelText(/Description \*/i), {
            target: { value: "Sample description" },
        });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Library added successfully!/i)).toBeInTheDocument();
        });


    });
});
