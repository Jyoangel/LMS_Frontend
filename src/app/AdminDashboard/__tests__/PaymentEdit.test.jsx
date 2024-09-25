import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentEdit from "../Payment/PaymentEdit";
import Successcard from "../../../Components/Successcard";
import { RxCrossCircled } from "react-icons/rx";

// Mock Successcard component
jest.mock("../../../Components/Successcard", () => ({
    __esModule: true,
    default: ({ para, onClose }) => (
        <div data-testid="successcard">
            <p>{para}</p>
            <button onClick={onClose}>Close</button>
        </div>
    ),
}));

describe("PaymentEdit Component", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });



    it("handles clicking outside the modal to close it", async () => {
        render(<PaymentEdit onClose={mockOnClose} />);
        fireEvent.mouseDown(document.body);
        await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
    });





    it("displays Successcard with correct message on 'Send' button click", async () => {
        render(<PaymentEdit onClose={mockOnClose} />);
        const sendButton = screen.getByText("Send");
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(screen.getByTestId("successcard")).toBeInTheDocument();
            expect(screen.getByText("Message send was successfully!")).toBeInTheDocument();
        });
    });

    it("calls onClose when clicking 'Close' on Successcard", async () => {
        render(<PaymentEdit onClose={mockOnClose} />);
        const sendButton = screen.getByText("Send");
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(screen.getByTestId("successcard")).toBeInTheDocument();
        });
        const closeSuccessCardButton = screen.getByRole("button", { name: /close/i });
        fireEvent.click(closeSuccessCardButton);
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    it("does not show Successcard initially", () => {
        render(<PaymentEdit onClose={mockOnClose} />);
        expect(screen.queryByTestId("successcard")).toBeNull();
    });

    it("updates state and shows Successcard after 'Send' button is clicked", async () => {
        render(<PaymentEdit onClose={mockOnClose} />);
        const sendButton = screen.getByText("Send");
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(screen.getByTestId("successcard")).toBeInTheDocument();
        });
    });


});
