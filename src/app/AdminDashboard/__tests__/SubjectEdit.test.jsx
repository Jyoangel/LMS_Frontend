import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditSubject from "../Subject/EditSubject/[id]/page";
import { fetchSubjectById, updateSubjectData } from "../../../../api/subjectapi";
import { useRouter } from "next/router";

// Mock the API and useRouter functions
jest.mock("../../../../api/subjectapi", () => ({
    updateSubjectData: jest.fn(),
    fetchSubjectById: jest.fn().mockResolvedValue({ class: "3", subject: "Math" })
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn()
}));

describe("EditSubject Component", () => {
    const mockSubjectData = {
        class: "3",
        subject: "Math",
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => { }); // Spy on console.error
        useRouter.mockReturnValue({
            push: jest.fn(),
            query: { id: "123" }
        });

        fetchSubjectById.mockResolvedValue(mockSubjectData); // Mock fetchSubjectById API call
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks
        console.error.mockRestore(); // Restore console.error
    });

    it("renders the form with initial data fetched from the API", async () => {
        render(<EditSubject params={{ id: "123" }} />);

        // Verify the initial data is fetched and rendered
        await waitFor(() => {
            expect(fetchSubjectById).toHaveBeenCalledWith("123");
            expect(screen.getByLabelText("Class*").value).toBe("3");
            expect(screen.getByLabelText("Subject *").value).toBe("Math");
        });
    });

    it("updates the form data on input change", async () => {
        render(<EditSubject params={{ id: "123" }} />);

        // Simulate changing the class select
        fireEvent.change(screen.getByLabelText("Class*"), { target: { value: "5" } });

        // Simulate changing the subject input
        fireEvent.change(screen.getByLabelText("Subject *"), { target: { value: "Science" } });

        // Verify the form data is updated
        expect(screen.getByLabelText("Class*").value).toBe("5");
        expect(screen.getByLabelText("Subject *").value).toBe("Science");
    });


    it("displays an error message if fetching initial data fails", async () => {
        fetchSubjectById.mockRejectedValueOnce(new Error("Failed to fetch"));

        render(<EditSubject params={{ id: "123" }} />);

        // Verify an error message is logged
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to fetch subject data:", expect.any(Error));
        });
    });

    it("displays an error message if updating subject data fails", async () => {
        updateSubjectData.mockRejectedValueOnce(new Error("Failed to update"));

        render(<EditSubject params={{ id: "123" }} />);

        // Simulate form submission
        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        // Verify an error message is logged
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to update subject data:", expect.any(Error));
        });
    });



    it("renders the class dropdown with correct options", () => {
        render(<EditSubject params={{ id: "123" }} />);

        // Verify the class dropdown options
        const classSelect = screen.getByLabelText("Class*");
        expect(classSelect).toBeInTheDocument();

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(11); // 10 classes + "Select" option

        options.forEach((option, index) => {
            if (index === 0) {
                expect(option.value).toBe("");
                expect(option).toHaveTextContent("Select");
            } else {
                expect(option.value).toBe(index.toString());
                expect(option).toHaveTextContent(index.toString());
            }
        });
    });

    it("displays the Successcard component when the form is successfully submitted", async () => {
        updateSubjectData.mockResolvedValueOnce({}); // Mock successful update

        render(<EditSubject params={{ id: "123" }} />);

        // Simulate form submission
        fireEvent.click(screen.getByRole("button", { name: /Update/i }));

        // Verify the success card is displayed
        await waitFor(() => {
            expect(screen.getByText("Subject updated successfully!")).toBeInTheDocument();
        });
    });
});
