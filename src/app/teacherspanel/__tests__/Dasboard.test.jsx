import { render, screen, fireEvent, act } from "@testing-library/react";
import Dashboard from "../Dashboard/page";
import { fetcheventData } from "../../../../api/api";
import { fetchReportCardData } from "../../../../api/reportcardapi";


jest.mock("../../../../api/api", () => ({
    fetcheventData: jest.fn(),
}));

jest.mock("../../../../api/reportcardapi", () => ({
    fetchReportCardData: jest.fn(),
}));

describe("Dashboard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders without crashing", async () => {
        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText("Upcoming School Events")).toBeInTheDocument();
    });

    test("displays events fetched from the API", async () => {
        const mockEvents = [
            {
                _id: "1",
                eventName: "Annual Day",
                eventDate: "2024-08-10",
                eventTime: "10:00 AM",
                description: "Annual day celebration",
                organizerName: "School",
            },
        ];

        fetcheventData.mockResolvedValue(mockEvents);

        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText("Annual Day")).toBeInTheDocument();
        expect(screen.getByText("10:00 AM")).toBeInTheDocument();
        expect(screen.getByText("Annual day celebration")).toBeInTheDocument();
    });

    test("handles error when fetching events", async () => {
        fetcheventData.mockRejectedValue(new Error("Error fetching events"));

        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText("Error fetching events")).toBeInTheDocument();
    });

    test("displays top students fetched from report card API", async () => {
        const mockReportData = [
            { id: "1", name: "John Doe", percentage: 85 },
            { id: "2", name: "Jane Smith", percentage: 90 },
        ];

        fetchReportCardData.mockResolvedValue(mockReportData);

        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });



    test("updates selected class and fetches attendance data", async () => {
        const mockClasses = [{ id: "1", name: "Class 1" }, { id: "2", name: "Class 2" }];
        const mockAttendanceData = [
            { month: "January", attendance: 80 },
            { month: "February", attendance: 82 },
        ];

        // Mock fetchClasses and fetchClassAttendanceData
        const fetchClasses = jest.fn().mockResolvedValue(mockClasses);
        const fetchClassAttendanceData = jest.fn().mockResolvedValue(mockAttendanceData);

        await act(async () => {
            render(<Dashboard />);
        });

        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "1" } });


    });
});
