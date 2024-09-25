import { render, screen, fireEvent, act } from '@testing-library/react';
import ConfirmationCard from '../components/ConfirmationCard';


describe('ConfirmationCard Component', () => {
    let onCloseMock;

    beforeEach(() => {
        onCloseMock = jest.fn();
    });

    test('renders ConfirmationCard component with provided text', () => {
        render(<ConfirmationCard onClose={onCloseMock} para="Are you sure?" />);
        expect(screen.getByText('Confirmation')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    test('closes the modal when "No" button is clicked', () => {
        render(<ConfirmationCard onClose={onCloseMock} para="Are you sure?" />);

        const noButton = screen.getByText('No');

        act(() => {
            fireEvent.click(noButton);
        });

        expect(onCloseMock).toHaveBeenCalled();
    });

    test('displays Successcard when "Yes" button is clicked', () => {
        render(<ConfirmationCard onClose={onCloseMock} para="Are you sure?" />);

        const yesButton = screen.getByText('Yes');

        act(() => {
            fireEvent.click(yesButton);
        });

        expect(screen.getByText('Access provided successfully')).toBeInTheDocument();
    });

    test('closes the modal when clicking outside of it', () => {
        const { container } = render(<ConfirmationCard onClose={onCloseMock} para="Are you sure?" />);

        act(() => {
            fireEvent.mouseDown(container);
        });

        expect(onCloseMock).toHaveBeenCalled();
    });

    test('does not close the modal when clicking inside the modal', () => {
        render(<ConfirmationCard onClose={onCloseMock} para="Are you sure?" />);

        const modalContent = screen.getByText('Confirmation');

        act(() => {
            fireEvent.mouseDown(modalContent);
        });

        expect(onCloseMock).not.toHaveBeenCalled();
    });
});
