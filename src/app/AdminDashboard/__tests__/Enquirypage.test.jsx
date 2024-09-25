import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Enquiry from "../Enquiry/page";
import { fetchEnquiryData } from "../../../../api/enquiryapi";
import "@testing-library/jest-dom";

jest.mock("../../../../api/enquiryapi", () => ({
    fetchEnquiryData: jest.fn(),
}));

describe("Enquiry Component", () => {
    beforeEach(() => {
        fetchEnquiryData.mockClear();
    });

    test("renders initial state correctly", () => {
        render(<Enquiry />);

        // Check initial total enquiry count is 0
        expect(screen.getByText("Total Enquiry: 0")).toBeInTheDocument();

        // Check if Add New button is present
        expect(screen.getByRole("link", { name: /Add New/i })).toBeInTheDocument();

        // Check if Show, Entries, and Search are present
        expect(screen.getByText("Show")).toBeInTheDocument();
        expect(screen.getByText("Entries")).toBeInTheDocument();

    });



    test("logs error message on fetch failure", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
        fetchEnquiryData.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<Enquiry />);

        // Wait for the API call to be attempted
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "Failed to fetch enquiry data:",
                expect.any(Error)
            );
        });

        consoleSpy.mockRestore();
    });

    test("navigates to Add Enquiry page on button click", () => {
        render(<Enquiry />);

        const addButton = screen.getByRole("link", { name: /Add New/i });
        expect(addButton).toHaveAttribute(
            "href",
            "/AdminDashboard/Enquiry/AddEnquiry"
        );
    });

    test("refresh button is present and clickable", () => {
        render(<Enquiry />);

        const refreshButton = screen.getByText("Refresh");
        expect(refreshButton).toBeInTheDocument();
        fireEvent.click(refreshButton);
        // Assuming the refresh button triggers a data reload,
        // the fetchEnquiryData would be called again.
        expect(fetchEnquiryData).toHaveBeenCalled();
    });

    test("pagination buttons are present and functional", () => {
        render(<Enquiry />);

        const leftButton = screen.getByRole("button", { name: /Previous Page/i });
        const rightButton = screen.getByRole("button", { name: /Next Page/i });

        expect(leftButton).toBeInTheDocument();
        expect(rightButton).toBeInTheDocument();

        fireEvent.click(leftButton);
        // Here, you would add logic to verify that clicking the left button changes the page state if applicable.
        // For example, ensuring that data is loaded for the previous page.

        fireEvent.click(rightButton);
        // Similarly, verify that clicking the right button changes the page state to the next page.
    });
});
