import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import CourseTable from "../Course/CourseTable";
import { fetchCourseData, deleteCourseData } from "../../../../api/courseapi";


// Mock the API functions
jest.mock("../../../../api/courseapi", () => ({
    fetchCourseData: jest.fn(),
    deleteCourseData: jest.fn(),
}));

// Mock the ConfirmationCard component
jest.mock("../components/ConfirmationCard", () => ({
    __esModule: true,
    default: jest.fn(({ para, onClose, onConfirm }) => (
        <div>
            <p>{para}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )),
}));

describe("CourseTable Component", () => {
    const mockCourseData = {
        courses: [
            {
                _id: "1",
                courseName: "Course 1",
                courseCode: "C1",
                primaryInstructorname: "Instructor 1",
                schedule: {
                    startDate: "2023-01-01",
                    endDate: "2023-12-31",
                    classTime: "09:00 AM - 10:00 AM",
                    classDays: ["Monday", "Wednesday", "Friday"],
                },
            },
            {
                _id: "2",
                courseName: "Course 2",
                courseCode: "C2",
                primaryInstructorname: "Instructor 2",
                schedule: {
                    startDate: "2023-02-01",
                    endDate: "2023-11-30",
                    classTime: "10:00 AM - 11:00 AM",
                    classDays: ["Tuesday", "Thursday"],
                },
            },
        ],
    };

    beforeEach(async () => {
        fetchCourseData.mockResolvedValue(mockCourseData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it("renders courses after data is loaded", async () => {
        await act(async () => {
            render(<CourseTable filter="" searchTerm="" />);
        });

        expect(screen.getByText("Course 1")).toBeInTheDocument();
        expect(screen.getByText("Course 2")).toBeInTheDocument();
    });

    it("renders error message if data fetching fails", async () => {
        const mockError = "Failed to fetch courses";
        fetchCourseData.mockRejectedValueOnce(new Error(mockError));

        await act(async () => {
            render(<CourseTable filter="" searchTerm="" />);
        });

        expect(screen.getByText(`Error: ${mockError}`)).toBeInTheDocument();
    });


    it("searches courses based on searchTerm prop", async () => {
        await act(async () => {
            render(<CourseTable filter="" searchTerm="Course 2" />);
        });

        expect(screen.queryByText("Course 1")).not.toBeInTheDocument();
        expect(screen.getByText("Course 2")).toBeInTheDocument();
    });

    it("opens delete confirmation on delete button click", async () => {
        await act(async () => {
            render(<CourseTable filter="" searchTerm="" />);
        });

        fireEvent.click(screen.getAllByText("Delete")[0]);
        expect(screen.getByText("Do you really want to delete this record?")).toBeInTheDocument();
    });

    it("closes delete confirmation on cancel", async () => {
        await act(async () => {
            render(<CourseTable filter="" searchTerm="" />);
        });

        fireEvent.click(screen.getAllByText("Delete")[0]);
        expect(screen.getByText("Do you really want to delete this record?")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));
        await waitFor(() => expect(screen.queryByText("Do you really want to delete this record?")).not.toBeInTheDocument());
    });


});
