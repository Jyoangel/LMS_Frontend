import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import CalendarPage from "../CalendarPage/page"; // Update with the correct path
import { fetchCalendarData } from "../../../../api/calendarapi";
import dayjs from "dayjs";

// Mock the API call
jest.mock("../../../../api/calendarapi", () => ({
    fetchCalendarData: jest.fn(),
}));

// Mock the Link component from next/link
jest.mock("next/link", () => {
    return ({ children }) => {
        return children;
    };
});

describe("CalendarPage", () => {
    const mockCalendarData = [
        {
            _id: "1",
            date: dayjs().format("YYYY-MM-DD"),
            type: "Event",
            title: "Meeting",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
        },
        {
            _id: "2",
            date: dayjs().add(1, "day").format("YYYY-MM-DD"),
            type: "Event",
            title: "Workshop",
            startTime: "1:00 PM",
            endTime: "3:00 PM",
        },
    ];

    beforeEach(() => {
        fetchCalendarData.mockResolvedValue(mockCalendarData);
    });

    it("renders the calendar page with the header and filter", async () => {
        await act(async () => {
            render(<CalendarPage />);
        });

        expect(screen.getByText("Calendar")).toBeInTheDocument();
        expect(screen.getByText("Filter")).toBeInTheDocument();
        expect(screen.getByText("June")).toBeInTheDocument();

        await waitFor(() => {
            expect(fetchCalendarData).toHaveBeenCalledTimes(1);
        });
    });

    it("renders events on the correct dates", async () => {
        await act(async () => {
            render(<CalendarPage />);
        });

        // Wait for the calendar data to be rendered
        await waitFor(() => {
            // Use `findByText` to wait for the text to appear
            expect(screen.getByText(/Meeting/i)).toBeInTheDocument();
            expect(screen.getByText(/10:00 AM - 11:00 AM/i)).toBeInTheDocument();
        });
    });


    it("shows the 'Add' button when a date is clicked", async () => {
        await act(async () => {
            render(<CalendarPage />);
        });

        // Select the calendar cell for today
        const todayDate = dayjs().format("D"); // Get today's date as a string
        const todayCell = screen.getByText(todayDate);

        // Simulate a click on the date cell
        fireEvent.click(todayCell);

        // Find all "Add" buttons and select the one related to the clicked date
        const addButtons = screen.getAllByRole("button", { name: /Add/i });
        const addButton = addButtons.find(button => {
            const parent = button.closest(".ant-picker-cell-inner");
            return parent && screen.getByText(todayDate).closest(".ant-picker-cell-inner") === parent;
        });

        expect(addButton).toBeInTheDocument();
    });


    it("handles next and previous month navigation", async () => {
        await act(async () => {
            render(<CalendarPage />);
        });

        const prevButton = screen.getByRole("button", { name: /Previous month/i });
        const nextButton = screen.getByRole("button", { name: /Next month/i });

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        // Simulate clicks if there are functions handling month changes
        fireEvent.click(nextButton);
        fireEvent.click(prevButton);
    });

    it("navigates to edit and add pages when links are clicked", async () => {
        await act(async () => {
            render(<CalendarPage />);
        });

        await waitFor(() => {
            const editLink = screen.getByText((content, element) =>
                element.tagName.toLowerCase() === "span" && content.includes("Meeting")
            );
            fireEvent.click(editLink);
        });

        // Add any navigation testing logic or assertions here
    });
});
