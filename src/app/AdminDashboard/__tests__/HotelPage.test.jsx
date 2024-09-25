import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HotelManagement from "../HotelManagement/page";
import { fetchHotelData } from "../../../../api/hotelapi";


// Mock the fetchHotelData function
jest.mock("../../../../api/hotelapi", () => ({
    fetchHotelData: jest.fn(),
}));

describe("HotelManagement Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchHotelData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<HotelManagement />);
        expect(screen.getByText(/Hotel Rooms:/)).toBeInTheDocument();
        expect(screen.getByText(/Add New/)).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockData = { count: 20 };
        fetchHotelData.mockResolvedValue(mockData);

        render(<HotelManagement />);

        await waitFor(() => {
            const hotelRoomsElement = screen.getByText(/Hotel Rooms: 20/);
            expect(hotelRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchHotelData).toHaveBeenCalledTimes(2);
    });





    test("navigates to Add New page on button click", () => {
        render(<HotelManagement />);
        const addButton = screen.getByText(/Add New/);

        // Verify the button contains a link to the AddHotel page
        expect(addButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/HotelManagement/AddHotel');
    });

    test("handles pagination button clicks", () => {
        render(<HotelManagement />);

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
        fetchHotelData.mockResolvedValue(mockData);

        render(<HotelManagement />);

        // Simulate a click on the refresh button
        const refreshButton = screen.getByText(/Refresh/);
        fireEvent.click(refreshButton);

        // Verify that the API is called again to fetch fresh data
        await waitFor(() => expect(fetchHotelData).toHaveBeenCalledTimes(2));
    });


    test("renders HotelTable component with correct props", () => {
        render(<HotelManagement />);

        // Verify that HotelTable is rendered with the correct filter and searchTerm props
        const hotelTable = screen.getByRole('table'); // Assume HotelTable renders a table
        expect(hotelTable).toBeInTheDocument();

        // You could further verify props if needed by mocking HotelTable
    });
});
