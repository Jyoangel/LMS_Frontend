import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Course from "../Course/page";
import { fetchCourseData } from "../../../../api/courseapi";

// Mock the fetchCourseData function


jest.mock("../../../../api/Courseapi", () => ({
    fetchCourseData: jest.fn(),
}));

describe("HotelManagement Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchCourseData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<Course />);
        expect(screen.getByText(/Total Course:/)).toBeInTheDocument();

        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockData = { count: 20 };
        fetchCourseData.mockResolvedValue(mockData);

        render(<Course />);

        await waitFor(() => {
            const hotelRoomsElement = screen.getByText(/Total Course: 20/);
            expect(hotelRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchCourseData).toHaveBeenCalledTimes(2);
    });







    it("should call fetchCourseData on component mount", async () => {
        fetchCourseData.mockResolvedValueOnce({ count: 5 });

        render(<Course />);

        await waitFor(() => {
            expect(fetchCourseData).toHaveBeenCalledTimes(2);
        });
    });



    it("should refresh Course data when the refresh button is clicked", async () => {
        fetchCourseData.mockResolvedValueOnce({ count: 5 });

        render(<Course />);

        const refreshButton = screen.getByText("Refresh");

        fireEvent.click(refreshButton);

        await waitFor(() => {
            expect(fetchCourseData).toHaveBeenCalledTimes(2);
        });
    });

    it("should render pagination buttons correctly", () => {
        render(<Course />);


        expect(screen.getByRole("button", { name: /left/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /right/i })).toBeInTheDocument();
    });
});
