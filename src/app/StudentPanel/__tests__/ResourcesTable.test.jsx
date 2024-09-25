import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ResourcesTable from "../Resources//ResoucesTable";
import { fetchLibraryData } from "../../../../api/libraryapi";
import format from "date-fns/format";

// Mock the fetchLibraryData API function
jest.mock("../../../../api/libraryapi");

const mockData = [
    {
        title: "Resource 1",
        description: "Description for resource 1",
        type: "PDF",
        subject: "Math",
        dateAdded: "2023-08-16",
    },
    {
        title: "Resource 2",
        description: "Description for resource 2",
        type: "Video",
        subject: "Science",
        dateAdded: "2023-08-17",
    },
];

describe("ResourcesTable", () => {
    beforeEach(() => {
        // Reset the mock data before each test
        fetchLibraryData.mockResolvedValue({ libraryItems: mockData });
    });

    it("renders the table with fetched data", async () => {
        await act(async () => {
            render(<ResourcesTable filter="" searchTerm="" />);
        });

        // Check if the data is rendered correctly
        expect(screen.getByText("Resource 1")).toBeInTheDocument();
        expect(screen.getByText("Resource 2")).toBeInTheDocument();
        expect(screen.getByText("Math")).toBeInTheDocument();
        expect(screen.getByText("Science")).toBeInTheDocument();
        expect(screen.getByText("PDF")).toBeInTheDocument();
        expect(screen.getByText("Video")).toBeInTheDocument();
        expect(screen.getByText("2023-08-16")).toBeInTheDocument();
        expect(screen.getByText("2023-08-17")).toBeInTheDocument();
    });




    it("handles empty data", async () => {
        fetchLibraryData.mockResolvedValue({ libraryItems: [] });

        await act(async () => {
            render(<ResourcesTable filter="" searchTerm="" />);
        });

        // Check that the table is empty
        expect(screen.queryByText("Resource 1")).toBeNull();
        expect(screen.queryByText("Resource 2")).toBeNull();
    });
});
