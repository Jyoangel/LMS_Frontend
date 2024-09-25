import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeeNotice2 from "../Fees/Component/FeeNotice2"; // Update the path as necessary
import { fetchFeeRecordById } from "../../../../api/api";
import { format } from "date-fns";

// Mock the necessary modules
jest.mock("../../../../api/api");
jest.mock("date-fns/format");

describe("FeeNotice2 Component", () => {
    const mockOnClose = jest.fn();
    const mockFeeRecord = {
        studentID: {
            name: "John Doe",
            parent: { fatherName: "Mr. Doe" },
            class: "10th",
            studentID: "STU123",
            contactNumber: "1234567890",
        },
        srNo: "SR123",
        dueAmount: "3000",
        months: ["Mar", "April"],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading state initially", () => {
        render(<FeeNotice2 onClose={mockOnClose} feeId="1" />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("fetches and displays fee details", async () => {
        fetchFeeRecordById.mockResolvedValue(mockFeeRecord);
        format.mockReturnValue("2024-08-14");

        render(<FeeNotice2 onClose={mockOnClose} feeId="1" />);

        screen.debug(); // Debug to see the rendered output

        await waitFor(() => {
            expect(screen.getByTestId("school-name")).toHaveTextContent("Gyan Ganga Public School");
            expect(screen.getByTestId("student-name")).toHaveTextContent("John Doe");
            expect(screen.getByTestId("student-class")).toHaveTextContent("10th");
            expect(screen.getByTestId("student-fees")).toHaveTextContent("3000");



        });
    });

    it("calls onClose when close button is clicked", async () => {
        fetchFeeRecordById.mockResolvedValue(mockFeeRecord);

        render(<FeeNotice2 onClose={mockOnClose} feeId="1" />);

        await waitFor(() => {
            const closeButton = screen.getByRole("button");
            fireEvent.click(closeButton);
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it("calls onClose when clicking outside the notice", async () => {
        fetchFeeRecordById.mockResolvedValue(mockFeeRecord);

        render(<FeeNotice2 onClose={mockOnClose} feeId="1" />);

        await waitFor(() => {
            screen.debug(); // Debug to see the rendered output
            const outsideArea = screen.getByTestId("outside-area");
            fireEvent.mouseDown(outsideArea);
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it("does not call onClose when clicking inside the notice", async () => {
        fetchFeeRecordById.mockResolvedValue(mockFeeRecord);

        render(<FeeNotice2 onClose={mockOnClose} feeId="1" />);

        await waitFor(() => {
            screen.debug(); // Debug to see the rendered output
            const noticeArea = screen.getByTestId("notice-area");
            fireEvent.mouseDown(noticeArea);
            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });


});
