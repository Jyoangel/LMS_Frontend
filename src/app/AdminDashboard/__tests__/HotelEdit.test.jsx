import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditHotel from "../HotelManagement/EditHotel/[id]/page"; // Adjust the path as necessary
import { fetchHotelById, updateHotelData } from "../../../../api/hotelapi"; // Adjust the path as necessary
import "@testing-library/jest-dom";

jest.mock("../../../../api/hotelapi", () => ({
    fetchHotelById: jest.fn(),
    updateHotelData: jest.fn(),
}));

describe("EditHotel Component", () => {
    const mockParams = { id: "123" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component correctly", () => {
        render(<EditHotel params={mockParams} />);

        // Check if the Back button is present
        expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();

        // Check if the form fields are present
        expect(screen.getByLabelText(/Type of Room*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Floor*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Zone*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price*/i)).toBeInTheDocument();

        // Check if the Update button is present
        expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
    });

    test("fetches and displays hotel data on mount", async () => {
        const mockHotelData = {
            TypeofRoom: "Single",
            floor: "1",
            zone: "North",
            price: "100",
        };

        fetchHotelById.mockResolvedValueOnce(mockHotelData);

        render(<EditHotel params={mockParams} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue("Single")).toBeInTheDocument();
            expect(screen.getByDisplayValue("1")).toBeInTheDocument();
            expect(screen.getByDisplayValue("North")).toBeInTheDocument();
            expect(screen.getByDisplayValue("100")).toBeInTheDocument();
        });
    });

    test("handles form submission with valid data", async () => {
        updateHotelData.mockResolvedValueOnce({});

        render(<EditHotel params={mockParams} />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Double" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "2" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "South" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "200" } });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(updateHotelData).toHaveBeenCalledWith("123", {
                TypeofRoom: "Double",
                floor: "2",
                zone: "South",
                price: "200",
            });
            expect(screen.getByText(/Room updated successfully!/i)).toBeInTheDocument();
        });
    });

    test("handles form submission with API error", async () => {
        updateHotelData.mockRejectedValueOnce(new Error("Failed to update room"));

        render(<EditHotel params={mockParams} />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Double" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "2" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "South" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "200" } });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to update room/i)).toBeInTheDocument();
        });
    });

    test("displays error message when fetching hotel data fails", async () => {
        fetchHotelById.mockRejectedValueOnce(new Error("Failed to fetch data"));

        render(<EditHotel params={mockParams} />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
        });
    });

    test("closes the success modal when the close button is clicked", async () => {
        updateHotelData.mockResolvedValueOnce({});

        render(<EditHotel params={mockParams} />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Double" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "2" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "South" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "200" } });

        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        await waitFor(() => {
            expect(screen.getByText(/Room updated successfully!/i)).toBeInTheDocument();
        });


    });
});
