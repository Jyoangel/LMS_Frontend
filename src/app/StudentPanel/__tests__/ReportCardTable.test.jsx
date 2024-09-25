import { render, screen, waitFor, act } from "@testing-library/react";
import ReportCardTable from "../ReportCard/ReportcardTable";
import { fetchReportCardData } from "../../../../api/reportcardapi";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

jest.mock("../../../../api/reportcardapi");

describe("ReportCardTable Component", () => {

    beforeEach(() => {
        fetchReportCardData.mockClear();
    });

    it("should render the component and display table headers", () => {
        render(<ReportCardTable />);

        expect(screen.getByText("Sr. No")).toBeInTheDocument();
        expect(screen.getByText("Examination")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Class")).toBeInTheDocument();
        expect(screen.getByText("DOB")).toBeInTheDocument();
        expect(screen.getByText("Father Name")).toBeInTheDocument();
        expect(screen.getByText("Session")).toBeInTheDocument();
        expect(screen.getByText("Percentage")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("should call fetchReportCardData and display fetched data", async () => {
        const mockData = [
            {
                _id: "1",
                type: "Mid Term",
                name: "John Doe",
                class: "10",
                dateOfBirth: "2005-08-15",
                fatherName: "Mr. Doe",
                session: "2023-2024",
                percentage: "85%",
                status: "Pass",
            },
            {
                _id: "2",
                type: "Final Term",
                name: "Jane Doe",
                class: "10",
                dateOfBirth: "2005-09-20",
                fatherName: "Mr. Doe",
                session: "2023-2024",
                percentage: "90%",
                status: "Pass",
            },
        ];

        fetchReportCardData.mockResolvedValueOnce(mockData);

        await act(async () => {
            render(<ReportCardTable />);
        });

        await waitFor(() => {
            expect(fetchReportCardData).toHaveBeenCalledTimes(1);
        });

        // Check that the fetched data is displayed in the table
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Doe")).toBeInTheDocument();
        expect(screen.getByText("Mid Term")).toBeInTheDocument();
        expect(screen.getByText("Final Term")).toBeInTheDocument();
        expect(screen.getByText("85%")).toBeInTheDocument();
        expect(screen.getByText("90%")).toBeInTheDocument();
    });

    it("should handle errors during data fetching", async () => {
        fetchReportCardData.mockRejectedValueOnce(new Error("Failed to fetch data"));

        await act(async () => {
            render(<ReportCardTable />);
        });

        await waitFor(() => {
            expect(fetchReportCardData).toHaveBeenCalledTimes(1);
        });

        // In this test, we expect the console to show the error message
        // Since the component doesn't display anything in the UI on error,
        // we just ensure no data is rendered.
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
        expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    });


});
