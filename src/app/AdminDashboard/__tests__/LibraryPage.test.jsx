import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LibraryManagement from "../LibraryManage/page";
import { fetchLibraryData } from "../../../../api/libraryapi";


// Mock the fetchHotelData function
jest.mock("../../../../api/libraryapi", () => ({
    fetchLibraryData: jest.fn(),
}));

describe("LibraryManagement Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchLibraryData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<LibraryManagement />);
        expect(screen.getByText(/Total Book:/)).toBeInTheDocument();
        expect(screen.getByText(/Add New/)).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockData = { count: 20 };
        fetchLibraryData.mockResolvedValue(mockData);

        render(<LibraryManagement />);

        await waitFor(() => {
            const libraryRoomsElement = screen.getByText(/Total Book: 20/);
            expect(libraryRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchLibraryData).toHaveBeenCalledTimes(2);
    });





    test("navigates to Add New page on button click", () => {
        render(<LibraryManagement />);
        const addButton = screen.getByText(/Add New/);

        // Verify the button contains a link to the AddHotel page
        expect(addButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/LibraryManage/AddLibrary');
    });

    test("handles pagination button clicks", () => {
        render(<LibraryManagement />);

        const leftButton = screen.getByRole('button', { name: /Previous Page/i });
        const rightButton = screen.getByRole('button', { name: /Next Page/i });

        fireEvent.click(leftButton);
        // You can verify state changes or function calls if there are handlers

        fireEvent.click(rightButton);
        // Again, verify any expected outcomes from the interaction
    });

    test("handles refresh button click", async () => {
        // Mock the API response
        const mockData = { count: 20 };
        fetchLibraryData.mockResolvedValue(mockData);

        render(<LibraryManagement />);

        // Simulate a click on the refresh button
        const refreshButton = screen.getByText(/Refresh/);
        fireEvent.click(refreshButton);

        // Verify that the API is called again to fetch fresh data
        await waitFor(() => expect(fetchLibraryData).toHaveBeenCalledTimes(2));
    });


    test("renders HotelTable component with correct props", () => {
        render(<LibraryManagement />);

        // Verify that HotelTable is rendered with the correct filter and searchTerm props
        const libraryTable = screen.getByRole('table'); // Assume HotelTable renders a table
        expect(libraryTable).toBeInTheDocument();

        // You could further verify props if needed by mocking HotelTable
    });
});
