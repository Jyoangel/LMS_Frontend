import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddLiveClasses from "../LiveClassScreen/AddLiveClasses/[courseId]/page";
import { addLiveClassData } from "../../../../api/liveclassapi";
import Successcard from "../../../Components/Successcard";

// Mock the API function and Successcard component
jest.mock("../../../../api/liveclassapi");
jest.mock("../../../Components/Successcard");

describe("AddLiveClasses Component", () => {
    const courseId = "testCourseId";

    beforeEach(() => {
        Successcard.mockImplementation(({ onClose, para }) => (
            <div data-testid="success-modal">
                <p>{para}</p>
                <button onClick={onClose}>Close</button>
            </div>
        ));
    });

    test("renders the form fields correctly", () => {
        render(<AddLiveClasses params={{ courseId }} />);

        expect(screen.getByLabelText(/Live Classes Topic/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Section/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Live Room/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Assign To/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Note to the students/i)).toBeInTheDocument();
    });

    test("updates state on input change", () => {
        render(<AddLiveClasses params={{ courseId }} />);

        const topicInput = screen.getByLabelText(/Live Classes Topic/i);
        fireEvent.change(topicInput, { target: { value: "Test Topic" } });
        expect(topicInput.value).toBe("Test Topic");

        const sectionInput = screen.getByLabelText(/Section/i);
        fireEvent.change(sectionInput, { target: { value: "A" } });
        expect(sectionInput.value).toBe("A");
    });

    test("calls addLiveClassData API on form submission", async () => {
        addLiveClassData.mockResolvedValueOnce({});

        render(<AddLiveClasses params={{ courseId }} />);

        fireEvent.change(screen.getByLabelText(/Live Classes Topic/i), { target: { value: "Test Topic" } });
        fireEvent.change(screen.getByLabelText(/Section/i), { target: { value: "A" } });
        fireEvent.change(screen.getByLabelText(/Live Room/i), { target: { value: "Room 101" } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-08-14" } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: "10:00" } });
        fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: "1 hour" } });
        fireEvent.change(screen.getByLabelText(/Assign To/i), { target: { value: "Teacher A" } });
        fireEvent.change(screen.getByLabelText(/Note to the students/i), { target: { value: "Be on time" } });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(addLiveClassData).toHaveBeenCalledWith({
                topic: "Test Topic",
                section: "A",
                liveRoom: "Room 101",
                date: "2023-08-14",
                time: "10:00",
                duration: "1 hour",
                assignTo: "Teacher A",
                noteToStudents: "Be on time",
                courseId: "testCourseId",
            });
        });
    });

    test("opens and closes the success modal on form submission", async () => {
        addLiveClassData.mockResolvedValueOnce({});

        render(<AddLiveClasses params={{ courseId }} />);

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByTestId("success-modal")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Close/i));

        await waitFor(() => {
            expect(screen.queryByTestId("success-modal")).not.toBeInTheDocument();
        });
    });

    test("displays error message on API call failure", async () => {
        console.error = jest.fn();
        addLiveClassData.mockRejectedValueOnce(new Error("API error"));

        render(<AddLiveClasses params={{ courseId }} />);

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to add live class data:", expect.any(Error));
        });
    });
});
