import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeeNotice from '../Fees/Component/FeeNotice/[id]/FeeNotice';
import { sendFeeNotice } from '../../../../api/api';
import { RxCrossCircled } from 'react-icons/rx';

// Mock the API function
jest.mock('../../../../api/api', () => ({
    sendFeeNotice: jest.fn(),
}));

describe('FeeNotice Component', () => {
    const onClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });



    test('closes the modal when clicking outside of it', () => {
        render(<FeeNotice studentID="123" onClose={onClose} />);

        // Click outside the modal
        fireEvent.mouseDown(document.body);

        // onClose should be called
        expect(onClose).toHaveBeenCalled();
    });

    test('does not close the modal when clicking inside the modal', () => {
        render(<FeeNotice studentID="123" onClose={onClose} />);

        // Click inside the modal
        fireEvent.mouseDown(screen.getByText('Fees Notice'));

        // onClose should not be called
        expect(onClose).not.toHaveBeenCalled();
    });

    test('handles form submission successfully', async () => {
        sendFeeNotice.mockResolvedValueOnce({}); // Mock successful response

        render(<FeeNotice studentID="123" onClose={onClose} />);

        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test Message' } });
        fireEvent.change(screen.getByLabelText('Remark'), { target: { value: 'Test Remark' } });
        fireEvent.change(screen.getByLabelText('Total Dues Fees Amount'), { target: { value: '1000' } });
        fireEvent.change(screen.getByLabelText('Months'), { target: { value: 'August' } });

        fireEvent.click(screen.getByText('Send'));

        // Wait for success message to appear
        await waitFor(() => expect(screen.getByText('Fee notice sent successfully!')).toBeInTheDocument());
    });

    test('handles form submission with error', async () => {
        sendFeeNotice.mockRejectedValueOnce(new Error('Failed to send notice')); // Mock error response

        render(<FeeNotice studentID="123" onClose={onClose} />);

        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test Message' } });
        fireEvent.change(screen.getByLabelText('Remark'), { target: { value: 'Test Remark' } });
        fireEvent.change(screen.getByLabelText('Total Dues Fees Amount'), { target: { value: '1000' } });
        fireEvent.change(screen.getByLabelText('Months'), { target: { value: 'August' } });

        fireEvent.click(screen.getByText('Send'));

        // Wait for error message to appear
        await waitFor(() => expect(screen.getByText('Failed to send notice')).toBeInTheDocument());
    });
});
