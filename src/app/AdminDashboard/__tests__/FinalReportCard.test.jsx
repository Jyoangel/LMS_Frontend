import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FinalReportcard from '../ReportCard/[id]/FinalReportCard'; // Update the import path according to your project structure
import { fetchReportCardById } from '../../../../api/reportcardapi';

jest.mock('../../../../api/reportcardapi');

describe('FinalReportcard Component', () => {

    const mockReportCardData = {
        rollNumber: '12345',
        session: '2024',
        name: 'John Doe',
        percentage: '85%',
        type: 'Mid-Term',
        class: '10',
        dateOfBirth: '2006-04-15',
        status: 'Passed',
        subjects: [
            { subjectName: 'Math', marks: '90' },
            { subjectName: 'Science', marks: '80' }
        ]
    };

    beforeEach(() => {
        fetchReportCardById.mockResolvedValue(mockReportCardData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the loading state initially', () => {
        render(<FinalReportcard params={{ id: '1' }} onClose={jest.fn()} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders report card data correctly', async () => {
        render(<FinalReportcard params={{ id: '1' }} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText('Soft Webtechs Solutions')).toBeInTheDocument());

        expect(screen.getByText(/Examination Roll Number:/i)).toBeInTheDocument();
        expect(screen.getByText(/12345/i)).toBeInTheDocument();
        expect(screen.getByText(/Session:/i)).toBeInTheDocument();
        expect(screen.getByText(/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/Student Name:/i)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Percentage:/i)).toBeInTheDocument();
        expect(screen.getByText(/85%/i)).toBeInTheDocument();
        expect(screen.getByText(/Class:/i)).toBeInTheDocument();
        expect(screen.getByText(/10/i)).toBeInTheDocument();
        expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        expect(screen.getByText(/Passed/i)).toBeInTheDocument();
    });

    it('renders the list of subjects and marks', async () => {
        render(<FinalReportcard params={{ id: '1' }} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText(/Soft Webtechs Solutions/i)).toBeInTheDocument());

        expect(screen.getByText(/Math/i)).toBeInTheDocument();
        expect(screen.getByText(/90/i)).toBeInTheDocument();
        expect(screen.getByText(/Science/i)).toBeInTheDocument();
        expect(screen.getByText(/80/i)).toBeInTheDocument();
    });

    it('calls onClose when clicking outside the modal', async () => {
        const onClose = jest.fn();
        render(<FinalReportcard params={{ id: '1' }} onClose={onClose} />);

        await waitFor(() => expect(screen.getByText(/Soft Webtechs Solutions/i)).toBeInTheDocument());

        fireEvent.mouseDown(document.body);

        expect(onClose).toHaveBeenCalledTimes(1);
    });



    it('displays the date of birth correctly formatted', async () => {
        render(<FinalReportcard params={{ id: '1' }} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText(/Soft Webtechs Solutions/i)).toBeInTheDocument());

        expect(screen.getByText(/2006-04-15/i)).toBeInTheDocument();
    });

    it('renders an input for remarks', async () => {
        render(<FinalReportcard params={{ id: '1' }} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText(/Soft Webtechs Solutions/i)).toBeInTheDocument());

        const remarksInput = screen.getByPlaceholderText('Type here');
        expect(remarksInput).toBeInTheDocument();
    });
});
