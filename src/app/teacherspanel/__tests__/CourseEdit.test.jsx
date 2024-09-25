import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CourseEdit from "../Course/EditCourse/[id]/page"; // Adjust the import based on your file structure
import { fetchCourseById, updateCourseData } from "../../../../api/courseapi"; // Adjust the import based on your file structure

jest.mock("../../../../api/courseapi"); // Mock the API functions

describe("CourseEdit Component", () => {
    const mockCourseData = {
        courseName: "Mathematics 101",
        courseCode: "MATH101",
        primaryInstructorname: "John Doe",
        instructorEmail: "john.doe@example.com",
        schedule: {
            startDate: "2024-08-20",
            endDate: "2024-12-15",
            classDays: ["Monday", "Wednesday", "Friday"],
            classTime: "10:00 AM - 11:30 AM"
        },
        courseObjectives: "Understand the basics of algebra and calculus.",
        supplementaryMaterials: "Textbook, Scientific Calculator",
        onlineResources: "www.mathresources.com",
        courseDescription: "This course covers basic concepts in mathematics."
    };

    const mockParams = { id: "123" };

    beforeEach(() => {
        fetchCourseById.mockResolvedValue(mockCourseData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component and fetches course data", async () => {
        render(<CourseEdit params={mockParams} />);

        await waitFor(() => {
            expect(fetchCourseById).toHaveBeenCalledWith("123");
            expect(screen.getByDisplayValue("Mathematics 101")).toBeInTheDocument();
        });
    });

    test("renders form fields with fetched course data", async () => {
        render(<CourseEdit params={mockParams} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue("Mathematics 101")).toBeInTheDocument();
            expect(screen.getByDisplayValue("MATH101")).toBeInTheDocument();
            expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
            expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("2024-08-20")).toBeInTheDocument();
            expect(screen.getByDisplayValue("2024-12-15")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Monday, Wednesday, Friday")).toBeInTheDocument();
            expect(screen.getByDisplayValue("10:00 AM - 11:30 AM")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Understand the basics of algebra and calculus.")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Textbook, Scientific Calculator")).toBeInTheDocument();
            expect(screen.getByDisplayValue("www.mathresources.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("This course covers basic concepts in mathematics.")).toBeInTheDocument();
        });
    });

    test("handles input changes correctly", async () => {
        render(<CourseEdit params={mockParams} />);

        const courseNameInput = await waitFor(() => screen.getByDisplayValue("Mathematics 101"));
        fireEvent.change(courseNameInput, { target: { value: "Physics 101" } });

        expect(courseNameInput.value).toBe("Physics 101");
    });

    test("updates course data when the form is submitted", async () => {
        render(<CourseEdit params={mockParams} />);

        const updateButton = await waitFor(() => screen.getByText("Update"));
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(updateCourseData).toHaveBeenCalledWith("123", {
                ...mockCourseData,
            });
        });
    });

    test("displays success modal after successful course update", async () => {
        updateCourseData.mockResolvedValueOnce({ success: true });

        render(<CourseEdit params={mockParams} />);

        const updateButton = await waitFor(() => screen.getByText("Update"));
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText("Course updated successfully!")).toBeInTheDocument();
        });
    });


});
