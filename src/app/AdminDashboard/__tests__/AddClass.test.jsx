// AddClass.test.js

import { render, screen, fireEvent, act } from "@testing-library/react";
import AddClass from "../../AdminDashboard/Class/AddClass/page";
import { addClassData } from "../../../../api/classapi";

// Mock the addClassData function
jest.mock("../../../../api/classapi", () => ({
    addClassData: jest.fn(),
}));

describe("AddClass Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders without crashing", () => {
        render(<AddClass />);
        expect(screen.getByText(/Back/i)).toBeInTheDocument();
        expect(screen.getByText(/Class\*/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Submit/i })
        ).toBeInTheDocument();
    });

    test("renders a select dropdown with 10 class options", () => {
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(11); // 10 options + 1 placeholder option
    });

    test("changes class selection correctly", () => {
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "5" } });
        expect(select.value).toBe("5");
    });

    test("submits the form and calls addClassData function", async () => {
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "3" } });
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(addClassData).toHaveBeenCalledWith({ className: "3" });
        expect(addClassData).toHaveBeenCalledTimes(1);
    });

    test("displays success modal on successful submission", async () => {
        addClassData.mockResolvedValueOnce({});
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "2" } });
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        const successMessage = await screen.findByText(
            /class added successfully!/i
        );
        expect(successMessage).toBeInTheDocument();
    });

    test("does not call addClassData if no class is selected", async () => {
        render(<AddClass />);
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(addClassData).not.toHaveBeenCalled();
    });

    test("closes success modal when done button is clicked", async () => {
        addClassData.mockResolvedValueOnce({});
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "2" } });
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        const doneButton = await screen.findByRole("button", { name: /Done/i });
        fireEvent.click(doneButton);
        expect(
            screen.queryByText(/class added successfully!/i)
        ).not.toBeInTheDocument();
    });

    test("handles addClassData error gracefully", async () => {
        addClassData.mockRejectedValueOnce(new Error("Network error"));
        render(<AddClass />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "4" } });
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        // In a real app, you might show an error message to the user
        // Here, we expect that no success message appears
        expect(
            screen.queryByText(/class added successfully!/i)
        ).not.toBeInTheDocument();
    });
});
