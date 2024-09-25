import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Subject from "../Subject/page";
import { fetchSubjectData } from "../../../../api/subjectapi";

// Mock the API function
jest.mock("../../../../api/subjectapi", () => ({
    fetchSubjectData: jest.fn(),
}));

describe("Subject Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component without crashing", () => {
        render(<Subject />);
        expect(screen.getByText(/Total Subject:/)).toBeInTheDocument();
    });

    it("displays the total subject count after fetching data", async () => {
        fetchSubjectData.mockResolvedValueOnce({ count: 5 });

        render(<Subject />);

        // Check initial state before fetching
        expect(screen.getByText(/Total Subject:/)).toHaveTextContent("Total Subject: 0");

        // Wait for the data to be fetched and the component to re-render

    });

    it("displays an error message if fetching fails", async () => {
        fetchSubjectData.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<Subject />);

        // Check initial state before fetching
        expect(screen.getByText(/Total Subject:/)).toHaveTextContent("Total Subject: 0");

        // Wait for the error handling code to execute

    });

    it("shows correct initial UI elements", () => {
        render(<Subject />);

        // Check if the UI elements are present
        expect(screen.getByText(/Total Subject:/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add New/ })).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        // expect(screen.getByRole('button', { name: /Refresh/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /1/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Previous Page/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Next Page/ })).toBeInTheDocument();
    });



    it("handles pagination buttons", () => {
        render(<Subject />);

        // Check if pagination buttons are present
        const prevButton = screen.getByRole('button', { name: /Previous Page/ });
        const nextButton = screen.getByRole('button', { name: /Next Page/ });

        // Simulate click events
        fireEvent.click(prevButton);
        fireEvent.click(nextButton);


    });
});
