import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeeDetails from '../Fees/FeeDetails/[studentID]/page';
import { fetchFeeRecordById } from '../../../../api/api';

jest.mock('../../../../api/api', () => ({
    fetchFeeRecordById: jest.fn(),
}));

describe('FeeDetails Component', () => {
    const mockParams = { studentID: '123' };

    test('renders FeeDetails component correctly', async () => {
        fetchFeeRecordById.mockResolvedValueOnce({
            studentID: {
                studentID: '123',
                name: 'John Doe',
                class: '10',
                dateOfBirth: '2005-01-01T00:00:00Z',
                gender: 'Male',
                aadharNumber: '123456789012',
                parent: { fatherName: 'Mr. Doe' },
                contactNumber: '1234567890'
            }
        });

        render(<FeeDetails params={mockParams} />);

        // Check if essential elements are rendered
        await waitFor(() => {
            expect(screen.getByTestId('back-button')).toBeInTheDocument();
            expect(screen.getByTestId('fee-notice-button')).toBeInTheDocument();
            expect(screen.getByTestId('student-id')).toBeInTheDocument();
            expect(screen.getByTestId('student-name')).toBeInTheDocument();
            expect(screen.getByTestId('student-class')).toBeInTheDocument();
            expect(screen.getByTestId('student-dob')).toBeInTheDocument();
            expect(screen.getByTestId('student-gender')).toBeInTheDocument();
            expect(screen.getByTestId('student-aadhar')).toBeInTheDocument();
            expect(screen.getByTestId('student-father-name')).toBeInTheDocument();
            expect(screen.getByTestId('student-contact')).toBeInTheDocument();
        });
    });

    test('displays loading state', () => {
        fetchFeeRecordById.mockImplementation(() => new Promise(() => { })); // Simulate loading

        render(<FeeDetails params={mockParams} />);

        // Check if loading message is displayed
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    test('displays error message', async () => {
        fetchFeeRecordById.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<FeeDetails params={mockParams} />);

        // Wait for error message to appear
        await waitFor(() => {
            expect(screen.getByTestId('error')).toHaveTextContent('Error: Failed to fetch');
        });
    });


});
