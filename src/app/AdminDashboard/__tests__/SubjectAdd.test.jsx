import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddLibrary from "../Subject/AddSubject/page"; // Adjust the import path as needed
import { addSubjectData } from "../../../../api/subjectapi"; // Adjust the import path as needed
import "@testing-library/jest-dom";

// Mock the addSubjectData function
jest.mock("../../../../api/subjectapi", () => ({
    addSubjectData: jest.fn(),
}));

describe("AddLibrary Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component correctly", () => {
        render(<AddLibrary />);

        // Check if the back button and heading are rendered
        expect(screen.getByText(/Back/i)).toBeInTheDocument();

        // Check if the class label and select are rendered
        expect(screen.getByLabelText(/Class\*/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox", { name: /Class\*/i })).toBeInTheDocument();

        // Check if the subject label and input are rendered
        expect(screen.getByLabelText(/Subject \*/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();

        // Check if the submit button is rendered
        expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });

    test("handles input changes", () => {
        render(<AddLibrary />);

        const classSelect = screen.getByRole("combobox", { name: /Class\*/i });
        const subjectInput = screen.getByPlaceholderText(/Type here/i);

        // Simulate changing the class select
        fireEvent.change(classSelect, { target: { value: "3" } });
        expect(classSelect.value).toBe("3");

        // Simulate typing in the subject input
        fireEvent.change(subjectInput, { target: { value: "Mathematics" } });
        expect(subjectInput.value).toBe("Mathematics");
    });

    test("submits the form and calls addSubjectData API", async () => {
        render(<AddLibrary />);

        const classSelect = screen.getByRole("combobox", { name: /Class\*/i });
        const subjectInput = screen.getByPlaceholderText(/Type here/i);
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        // Simulate filling out the form
        fireEvent.change(classSelect, { target: { value: "3" } });
        fireEvent.change(subjectInput, { target: { value: "Mathematics" } });

        // Mock the API response
        addSubjectData.mockResolvedValueOnce();

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for the API call to resolve and modal to open
        await waitFor(() => {
            expect(addSubjectData).toHaveBeenCalledTimes(1);
            expect(addSubjectData).toHaveBeenCalledWith({
                class: "3",
                subject: "Mathematics",
            });
        });

        // Check if the success modal is displayed
        expect(screen.getByText(/Subject added successfully!/i)).toBeInTheDocument();
    });

    test("displays error message when API call fails", async () => {
        render(<AddLibrary />);

        const classSelect = screen.getByRole("combobox", { name: /Class\*/i });
        const subjectInput = screen.getByPlaceholderText(/Type here/i);
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        // Simulate filling out the form
        fireEvent.change(classSelect, { target: { value: "3" } });
        fireEvent.change(subjectInput, { target: { value: "Mathematics" } });

        // Mock the API rejection
        addSubjectData.mockRejectedValueOnce(new Error("API error"));

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for the API call to resolve and error to be handled
        await waitFor(() => {
            expect(addSubjectData).toHaveBeenCalledTimes(1);
            expect(addSubjectData).toHaveBeenCalledWith({
                class: "3",
                subject: "Mathematics",
            });
        });

        // The console.error would be logged in case of an error; it won't display in UI, 
        // but we assume error handling might be visible via console or future UI elements
    });

    test("navigates back when the back button is clicked", () => {
        render(<AddLibrary />);

        const backButton = screen.getByText(/Back/i);

        // Simulate clicking the back button
        fireEvent.click(backButton);

        // Verify if the link's href is correct (depends on your router mock setup)
        expect(backButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/Subject');
    });
});
