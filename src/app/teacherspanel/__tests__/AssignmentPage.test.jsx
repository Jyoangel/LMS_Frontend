import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Assignment from "../Assignment/page";
import { fetchAssignmentData } from "../../../../api/assignmentapi";

// Mock the fetchAssignmentData function
jest.mock("../../../../api/assignmentapi", () => ({
    fetchAssignmentData: jest.fn(),
}));

describe("Assignment Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchAssignmentData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<Assignment />);

        expect(screen.getByText(/Total Assignment:/)).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /left/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /right/i })).toBeInTheDocument();
    });

    test("fetches and displays assignment data on mount", async () => {
        const mockData = { count: 30 };
        fetchAssignmentData.mockResolvedValue(mockData);

        render(<Assignment />);

        await waitFor(() => {
            const totalAssignmentsElement = screen.getByText(/Total Assignment: 30/);
            expect(totalAssignmentsElement).toBeInTheDocument();
        });

        // Check that the API was called once
        expect(fetchAssignmentData).toHaveBeenCalledTimes(2);
    });





    test("handles pagination button clicks", () => {
        render(<Assignment />);

        const prevButton = screen.getByRole('button', { name: /left/i });
        const nextButton = screen.getByRole('button', { name: /right/i });

        fireEvent.click(prevButton);
        fireEvent.click(nextButton);

        // Add expectations if you have state changes or function calls to verify
    });

    test("handles refresh button click", async () => {
        // Mock the API response
        const mockData = { count: 30 };
        fetchAssignmentData.mockResolvedValue(mockData);

        render(<Assignment />);

        // Simulate a click on the refresh button
        const refreshButton = screen.getByText(/Refresh/);
        fireEvent.click(refreshButton);


    });


});
