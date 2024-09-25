import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinalAdmitcard from '../ReportCard/AdmitCard/FinalAdmitcard/[studentID]/page';
import { fetchAdmitCardById } from '../../../../api/reportcardapi';
import React from 'react';

// Mock the API function
jest.mock('../../../../api/reportcardapi', () => ({
    fetchAdmitCardById: jest.fn(),
}));

// Mock the Image component to avoid actual image rendering in tests
jest.mock('next/image', () => (props) => <img {...props} alt={props.alt} />);

describe('FinalAdmitcard Component', () => {
    const mockAdmitCardData = {
        examination_roll_number: '12345',
        session: '2024-2025',
        student_name: 'John Doe',
        startdate: '2024-08-01',
        examstarting_time: '09:00 AM',
        school_name: 'ABC High School',
        examination: 'Midterm Exam',
        class: '10th Grade',
        enddate: '2024-08-10',
        examending_time: '12:00 PM',
        examsubjects: [
            { subject: 'Mathematics', examination_date: '2024-08-02' },
            { subject: 'Science', examination_date: '2024-08-05' },
        ],
    };

    const params = { id: '1' };
    const onClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', async () => {
        fetchAdmitCardById.mockReturnValueOnce(new Promise(() => { })); // Simulate loading state

        render(<FinalAdmitcard params={params} onClose={onClose} />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders error state when fetching data fails', async () => {
        const errorMessage = 'Failed to fetch data';
        fetchAdmitCardById.mockRejectedValueOnce(new Error(errorMessage));

        render(<FinalAdmitcard params={params} onClose={onClose} />);

        await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
    });

    test('renders admit card data correctly', async () => {
        fetchAdmitCardById.mockResolvedValueOnce(mockAdmitCardData);

        render(<FinalAdmitcard params={params} onClose={onClose} />);

        // Wait for data to load
        await waitFor(() => expect(screen.getByText('Soft Webtechs Solutions')).toBeInTheDocument());

        expect(screen.getByText(/Examination Roll Number:/i)).toBeInTheDocument();
        expect(screen.getByText('12345')).toBeInTheDocument();

        expect(screen.getByText(/Session:/i)).toBeInTheDocument();
        expect(screen.getByText('2024-2025')).toBeInTheDocument();

        expect(screen.getByText(/Student Name:/i)).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        expect(screen.getByText(/School Name:/i)).toBeInTheDocument();
        expect(screen.getByText('ABC High School')).toBeInTheDocument();

        expect(screen.getByText(/Mathematics/)).toBeInTheDocument();
        expect(screen.getByText(/2024-08-02/)).toBeInTheDocument();
    });

    test('renders a list of subjects in the table', async () => {
        fetchAdmitCardById.mockResolvedValueOnce(mockAdmitCardData);

        render(<FinalAdmitcard params={params} onClose={onClose} />);

        // Wait for data to load
        await waitFor(() => expect(screen.getByText('Soft Webtechs Solutions')).toBeInTheDocument());

        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('Mathematics')).toBeInTheDocument();
        expect(screen.getByText('2024-08-02')).toBeInTheDocument();

        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('Science')).toBeInTheDocument();
        expect(screen.getByText('2024-08-05')).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', async () => {
        fetchAdmitCardById.mockResolvedValueOnce(mockAdmitCardData);

        render(<FinalAdmitcard params={params} onClose={onClose} />);

        // Wait for data to load
        await waitFor(() => expect(screen.getByText('Soft Webtechs Solutions')).toBeInTheDocument());

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
