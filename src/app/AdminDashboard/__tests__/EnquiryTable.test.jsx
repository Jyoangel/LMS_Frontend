import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnquiryTable from "../Enquiry/EnquiryTable";
import { fetchEnquiryData, deleteEnquiryData } from "../../../../api/enquiryapi";

jest.mock("../../../../api/enquiryapi", () => ({
    fetchEnquiryData: jest.fn(),
    deleteEnquiryData: jest.fn(),
}));

const mockEnquiryData = {
    enquiries: [
        {
            _id: "1",
            name: "John Doe",
            contactNumber: "1234567890",
            email: "john@example.com",
            enquiryRelated: "Course Information",
            class: "10",
        },
        {
            _id: "2",
            name: "Jane Smith",
            contactNumber: "0987654321",
            email: "jane@example.com",
            enquiryRelated: "Admission Process",
            class: "11",
        },
    ],
};

describe("EnquiryTable", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", () => {
        render(<EnquiryTable filter="" searchTerm="" />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("fetches and displays enquiry data", async () => {
        fetchEnquiryData.mockResolvedValueOnce(mockEnquiryData);

        render(<EnquiryTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        });
    });

    test("displays error message on fetch failure", async () => {
        fetchEnquiryData.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<EnquiryTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
        });
    });

    test("filters enquiry data based on class and search term", async () => {
        fetchEnquiryData.mockResolvedValueOnce(mockEnquiryData);

        render(<EnquiryTable filter="10" searchTerm="john" />);

        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
        });
    });

    test("opens and closes delete confirmation card", async () => {
        fetchEnquiryData.mockResolvedValueOnce(mockEnquiryData);

        render(<EnquiryTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
        });

        const deleteButtons = screen.getAllByText(/Delete/i);
        fireEvent.click(deleteButtons[0]);

        expect(
            screen.getByText(/Do you really want to delete this record?/i)
        ).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(
            screen.queryByText(/Do you really want to delete this record?/i)
        ).not.toBeInTheDocument();
    });

    {/*test("deletes an enquiry and updates the table", async () => {
        fetchEnquiryData.mockResolvedValueOnce(mockEnquiryData);
        deleteEnquiryData.mockResolvedValueOnce({ success: true });

        render(<EnquiryTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
        });

        const deleteButtons = screen.getAllByText(/Delete/i);
        fireEvent.click(deleteButtons[0]);

        expect(
            screen.getByText(/Do you really want to delete this record?/i)
        ).toBeInTheDocument();

        // Simulate confirming the delete action
        fireEvent.click(screen.getByText(/Confirm/i));

        await waitFor(() => {
            expect(deleteEnquiryData).toHaveBeenCalledWith("1");
            expect(deleteEnquiryData).toHaveBeenCalledTimes(1);
            expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
        });
    });
    */}
});
