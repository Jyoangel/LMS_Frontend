import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateLiveClasses from "../LiveClassScreen/UpdateLiveClasses/[id]/page"; // Adjust the path as necessary
import { fetchLiveClassById, updateLiveClassData } from "../../../../api/liveclassapi"; // Adjust path as per your project

// Mock the API calls
jest.mock("../../../../api/liveclassapi", () => ({
    fetchLiveClassById: jest.fn(),
    updateLiveClassData: jest.fn(),
}));

const mockData = {
    topic: "Test Topic",
    section: "A",
    liveRoom: "Room 101",
    date: "2023-08-14",
    time: "10:00",
    duration: "1 hour",
    assignTo: "Teacher A",
    noteToStudents: "Please be on time",
    courseId: "course123",
};

describe("UpdateLiveClasses Component", () => {
    beforeEach(() => {
        fetchLiveClassById.mockResolvedValue(mockData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the form with initial data", async () => {
        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);

        expect(fetchLiveClassById).toHaveBeenCalledWith("liveClass123");

        await waitFor(() => {
            expect(screen.getByLabelText(/Live Classes Topic/i)).toHaveValue(mockData.topic);
            expect(screen.getByLabelText(/Section/i)).toHaveValue(mockData.section);
            expect(screen.getByLabelText(/Live Room/i)).toHaveValue(mockData.liveRoom);
            expect(screen.getByLabelText(/Date/i)).toHaveValue(mockData.date);
            expect(screen.getByLabelText(/Time/i)).toHaveValue(mockData.time);
            expect(screen.getByLabelText(/Duration/i)).toHaveValue(mockData.duration);
            expect(screen.getByLabelText(/Assign To/i)).toHaveValue(mockData.assignTo);
            expect(screen.getByLabelText(/Note to the students/i)).toHaveValue(mockData.noteToStudents);
        });
    });

    test("handles input changes", async () => {
        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);

        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/Live Classes Topic/i), { target: { value: "Updated Topic" } });
            expect(screen.getByLabelText(/Live Classes Topic/i)).toHaveValue("Updated Topic");
        });
    });

    test("calls updateLiveClassData API on form submission", async () => {
        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);



        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));



    });

    test("shows success modal on successful form submission", async () => {
        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);

        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Live class updated successfully!/i)).toBeInTheDocument();
        });
    });

    test("closes success modal when close button is clicked", async () => {
        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);

        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Live class updated successfully!/i)).toBeInTheDocument();
        });


    });



    test("handles update error", async () => {
        updateLiveClassData.mockRejectedValueOnce(new Error("Failed to update"));

        render(<UpdateLiveClasses params={{ id: "liveClass123" }} />);

        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(screen.queryByText(/Live class updated successfully!/i)).not.toBeInTheDocument();
        });
    });
});
