import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddHotel from "../HotelManagement/AddHotel/[studentID]/page";
import { addHotelData } from "../../../../api/hotelapi";
import "@testing-library/jest-dom";

jest.mock("../../../../api/hotelapi", () => ({
    addHotelData: jest.fn(),
}));

describe("AddHotel Component", () => {
    beforeEach(() => {
        addHotelData.mockClear();
    });

    test("renders the component correctly", () => {
        render(<AddHotel />);

        // Check if the Back button is present
        expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();

        // Check if the form fields are present
        expect(screen.getByLabelText(/Type of Room*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Floor*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Zone*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price*/i)).toBeInTheDocument();

        // Check if the Submit button is present
        expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });

    test("handles form submission with valid data", async () => {
        addHotelData.mockResolvedValueOnce({});

        render(<AddHotel />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Single" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "North" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "100" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(addHotelData).toHaveBeenCalledWith({
                typeOfRoom: "Single",
                floor: "1",
                zone: "North",
                price: "100",
            });
        });

        expect(screen.getByText(/Room Created successfully!/i)).toBeInTheDocument();
    });

    test("handles form submission with API error", async () => {
        addHotelData.mockRejectedValueOnce(new Error("Failed to create room"));

        render(<AddHotel />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Single" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "North" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "100" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to create room/i)).toBeInTheDocument();
        });
    });

    test("shows error message when submission fails", async () => {
        addHotelData.mockRejectedValueOnce(new Error("Submission error"));

        render(<AddHotel />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Single" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "North" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "100" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Submission error/i)).toBeInTheDocument();
        });
    });

    test("handles modal open and close correctly", async () => {
        render(<AddHotel />);

        fireEvent.change(screen.getByLabelText(/Type of Room*/i), { target: { value: "Single" } });
        fireEvent.change(screen.getByLabelText(/Floor*/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/Zone*/i), { target: { value: "North" } });
        fireEvent.change(screen.getByLabelText(/Price*/i), { target: { value: "100" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Room Created successfully!/i)).toBeInTheDocument();
        });


    });
});
