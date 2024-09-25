import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HotelTable from "../HotelManagement/HotelTable"; // Adjust the path as necessary
import { fetchHotelData, deleteHotelData } from "../../../../api/hotelapi"; // Adjust the path as necessary
import "@testing-library/jest-dom";
import { format } from "date-fns";

// Mock the API functions
jest.mock("../../../../api/hotelapi", () => ({
    fetchHotelData: jest.fn(),
    deleteHotelData: jest.fn(),
}));

describe("HotelTable Component", () => {
    const mockHotelData = {
        hotels: [
            {
                id: "1",
                _id: "1",
                typeOfRoom: "Single",
                floor: "1",
                zone: "North",
                date: "2024-08-12",
                time: "10:00",
            },
            {
                id: "2",
                _id: "2",
                typeOfRoom: "Double",
                floor: "2",
                zone: "South",
                date: "2024-08-13",
                time: "11:00",
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component correctly", () => {
        render(<HotelTable filter="" searchTerm="" />);

        // Check if the table headers are present
        expect(screen.getByText(/Sr. No/i)).toBeInTheDocument();
        expect(screen.getByText(/Type of Room/i)).toBeInTheDocument();
        expect(screen.getByText(/Floor/i)).toBeInTheDocument();
        expect(screen.getByText(/Zone/i)).toBeInTheDocument();
        expect(screen.getByText(/Date and Time/i)).toBeInTheDocument();
        expect(screen.getByText(/Action/i)).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        fetchHotelData.mockResolvedValueOnce(mockHotelData);

        render(<HotelTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText(/Single/i)).toBeInTheDocument();
            expect(screen.getByText(/Double/i)).toBeInTheDocument();

            // Assuming there's a unique row for each item
            expect(screen.getAllByText(/1/i)[0]).toBeInTheDocument();
            expect(screen.getAllByText(/2/i)[0]).toBeInTheDocument();
        });
    });

    test("handles error while fetching hotel data", async () => {
        fetchHotelData.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<HotelTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.queryByText(/Single/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/Double/i)).not.toBeInTheDocument();
        });
    });

    test("filters hotel data based on search term", async () => {
        fetchHotelData.mockResolvedValueOnce(mockHotelData);

        render(<HotelTable filter="" searchTerm="Double" />);

        await waitFor(() => {
            expect(screen.getByText(/Double/i)).toBeInTheDocument();
            expect(screen.queryByText(/Single/i)).not.toBeInTheDocument();
        });
    });

    test("filters hotel data based on filter", async () => {
        fetchHotelData.mockResolvedValueOnce(mockHotelData);

        render(<HotelTable filter="2" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText(/Double/i)).toBeInTheDocument();
            expect(screen.queryByText(/Single/i)).not.toBeInTheDocument();
        });
    });

    test("opens and closes delete confirmation", async () => {
        fetchHotelData.mockResolvedValueOnce(mockHotelData);

        render(<HotelTable filter="" searchTerm="" />);

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/Delete/i)[0]); // Assuming the delete button is correct
            expect(screen.getByText(/Do you really want to delete this record?/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Cancel/i));
        await waitFor(() => {
            expect(screen.queryByText(/Do you really want to delete this record?/i)).not.toBeInTheDocument();
        });
    });
});
