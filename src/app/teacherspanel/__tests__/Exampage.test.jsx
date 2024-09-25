import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Exam from "../Exam/page";
import { fetchExamData } from "../../../../api/examapi";

// Mock the fetchExamData function


jest.mock("../../../../api/Examapi", () => ({
    fetchExamData: jest.fn(),
}));

describe("HotelManagement Component", () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        fetchExamData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<Exam />);
        expect(screen.getByText(/Total Exam:/)).toBeInTheDocument();

        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockData = { count: 20 };
        fetchExamData.mockResolvedValue(mockData);

        render(<Exam />);

        await waitFor(() => {
            const hotelRoomsElement = screen.getByText(/Total Exam: 20/);
            expect(hotelRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchExamData).toHaveBeenCalledTimes(2);
    });







    it("should call fetchExamData on component mount", async () => {
        fetchExamData.mockResolvedValueOnce({ count: 5 });

        render(<Exam />);

        await waitFor(() => {
            expect(fetchExamData).toHaveBeenCalledTimes(2);
        });
    });



    it("should refresh Exam data when the refresh button is clicked", async () => {
        fetchExamData.mockResolvedValueOnce({ count: 5 });

        render(<Exam />);

        const refreshButton = screen.getByText("Refresh");

        fireEvent.click(refreshButton);

        await waitFor(() => {
            expect(fetchExamData).toHaveBeenCalledTimes(2);
        });
    });

    it("should render pagination buttons correctly", () => {
        render(<Exam />);


        expect(screen.getByRole("button", { name: /left/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /right/i })).toBeInTheDocument();
    });
});
