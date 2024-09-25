import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LiveClassScreen from "../LiveClassScreen/page";
import { fetchCourseData } from "../../../../api/courseapi";

jest.mock("../../../../api/courseapi");

describe("LiveClassScreen Component", () => {
    beforeEach(() => {
        fetchCourseData.mockReset();
    });

    test("renders the component with initial layout", () => {
        render(<LiveClassScreen />);
        expect(screen.getByText(/Total Course:/)).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();
    });






    it("handles page navigation", () => {
        render(<LiveClassScreen />);
        const nextButton = screen.getByRole("button", { name: /Previous Page/i });
        const prevButton = screen.getByRole("button", { name: /Next Page/i });
        expect(nextButton).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();
        fireEvent.click(nextButton); // In actual implementation, should go to next page.
        fireEvent.click(prevButton); // In actual implementation, should go to the previous page.
    });




    test("handles refresh button click", async () => {
        // Mock the API response
        const mockData = { count: 20 };
        fetchCourseData.mockResolvedValue(mockData);

        render(<LiveClassScreen />);

        // Simulate a click on the refresh button
        const refreshButton = screen.getByText(/Refresh/);
        fireEvent.click(refreshButton);

        // Verify that the API is called again to fetch fresh data
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(2));
    });



});
