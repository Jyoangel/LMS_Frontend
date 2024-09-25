import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Homework from "../Classes/page";
import { fetchHomeWorkData } from "../../../../api/homeworkapi";

// Mock the fetchHomeWorkData function


jest.mock("../../../../api/homeworkapi", () => ({
    fetchHomeWorkData: jest.fn(),
}));

describe("HotelManagement Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchHomeWorkData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<Homework />);
        expect(screen.getByText(/Home Work:/)).toBeInTheDocument();

        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockData = { count: 20 };
        fetchHomeWorkData.mockResolvedValue(mockData);

        render(<Homework />);

        await waitFor(() => {
            const hotelRoomsElement = screen.getByText(/Home Work: 20/);
            expect(hotelRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchHomeWorkData).toHaveBeenCalledTimes(2);
    });



    it("should handle fetchHomeWorkData errors", async () => {
        fetchHomeWorkData.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<Homework />);

        await waitFor(() => {
            expect(screen.getByTestId("homework-count")).toHaveTextContent("Home Work: 0");
        });
    });



    it("should call fetchHomeWorkData on component mount", async () => {
        fetchHomeWorkData.mockResolvedValueOnce({ count: 5 });

        render(<Homework />);

        await waitFor(() => {
            expect(fetchHomeWorkData).toHaveBeenCalledTimes(2);
        });
    });



    it("should refresh homework data when the refresh button is clicked", async () => {
        fetchHomeWorkData.mockResolvedValueOnce({ count: 5 });

        render(<Homework />);

        const refreshButton = screen.getByText("Refresh");

        fireEvent.click(refreshButton);

        await waitFor(() => {
            expect(fetchHomeWorkData).toHaveBeenCalledTimes(2);
        });
    });

    it("should render pagination buttons correctly", () => {
        render(<Homework />);


        expect(screen.getByRole("button", { name: /left/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /right/i })).toBeInTheDocument();
    });
});
