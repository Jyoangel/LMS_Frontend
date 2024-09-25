import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditLibrary from "../LibraryManage/EditLibrary/[id]/page"; // Adjust the path as necessary
import { fetchLibraryById, updateLibraryData } from "../../../../api/libraryapi"; // Adjust the path as necessary
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("../../../../api/libraryapi", () => ({
    fetchLibraryById: jest.fn(),
    updateLibraryData: jest.fn(),
}));

describe("EditLibrary Component", () => {
    const mockParams = { id: "123" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component correctly", () => {
        render(<EditLibrary params={mockParams} />);

        // Check if the form fields and buttons are present
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Author Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Uploaded By/i)).toBeInTheDocument(); // Added check for "Uploaded By"
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument(); // Added check for "Uploaded By"
        expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
    });

    test("fetches and displays library data on mount", async () => {
        const mockLibraryData = {
            title: "Sample Title",
            subject: "Sample Subject",
            class: "10",
            type: "Reference",
            authorName: "Author A",
            uploadedBy: "Uploader B", // Added field
            description: "Sample description",
        };

        fetchLibraryById.mockResolvedValueOnce(mockLibraryData);

        render(<EditLibrary params={mockParams} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue("Sample Title")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Sample Subject")).toBeInTheDocument();
            expect(screen.getByDisplayValue("10")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Reference")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Author A")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Uploader B")).toBeInTheDocument(); // Added check
            expect(screen.getByDisplayValue("Sample description")).toBeInTheDocument(); // Added check
        });
    });

    test("handles form submission with valid data", async () => {
        updateLibraryData.mockResolvedValueOnce({});

        render(<EditLibrary params={mockParams} />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Updated Title" } });
        fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: "Updated Subject" } });
        fireEvent.change(screen.getByLabelText(/Class/i), { target: { value: "12" } });
        fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "Textbook" } });
        fireEvent.change(screen.getByLabelText(/Author Name/i), { target: { value: "Updated Author" } });
        fireEvent.change(screen.getByLabelText(/Uploaded By/i), { target: { value: "Updated Uploader" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Updated description" } });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(updateLibraryData).toHaveBeenCalledWith("123", {
                title: "Updated Title",
                subject: "Updated Subject",
                class: "12",
                type: "Textbook",
                authorName: "Updated Author",
                uploadedBy: "Updated Uploader",
                description: "Updated description",
            });
        });
    });





    test("displays success message and handles close modal action", async () => {
        updateLibraryData.mockResolvedValueOnce({});

        render(<EditLibrary params={mockParams} />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Updated Title" } });
        fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: "Updated Subject" } });
        fireEvent.change(screen.getByLabelText(/Class/i), { target: { value: "12" } });
        fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "Textbook" } });
        fireEvent.change(screen.getByLabelText(/Author Name/i), { target: { value: "Updated Author" } });
        fireEvent.change(screen.getByLabelText(/Uploaded By/i), { target: { value: "Updated Uploader" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Updated description" } });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(screen.getByText(/Library updated successfully!/i)).toBeInTheDocument();

        });
    });
});
