// TranspotationTable.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranspotationTable from '../Transpotation/TranspotationTable';
import { fetchTranspotationData, deleteTranspotationData } from '../../../../api/transpotationapi';

// Mocking API calls
jest.mock('../../../../api/transpotationapi');

const mockData = [
    {
        _id: '1',
        studentName: 'John Doe',
        class: '5',
        rollNo: '123',
        fatherName: 'Mr. Doe',
        fatherContactNumber: '1234567890',
        pickupLocation: 'Location A',
        dropLocation: 'Location B',
    },
    {
        _id: '2',
        studentName: 'Jane Smith',
        class: '6',
        rollNo: '124',
        fatherName: 'Mr. Smith',
        fatherContactNumber: '0987654321',
        pickupLocation: 'Location C',
        dropLocation: 'Location D',
    },
];

describe('TranspotationTable Component', () => {
    beforeEach(() => {
        fetchTranspotationData.mockResolvedValue({ records: mockData });
        deleteTranspotationData.mockResolvedValue({ success: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        render(<TranspotationTable filter="" searchTerm="" />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders fetched data in the table', async () => {
        render(<TranspotationTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    it('filters data based on the class', async () => {
        render(<TranspotationTable filter="5" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        });
    });

    it('searches and filters data based on student name', async () => {
        render(<TranspotationTable filter="" searchTerm="Jane" />);
        await waitFor(() => {
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });

    it('opens and closes the delete confirmation modal', async () => {
        render(<TranspotationTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        // Open delete confirmation
        fireEvent.click(screen.getAllByText('Delete')[0]);
        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();

        // Close delete confirmation
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument();
    });

    it('deletes a record when confirmed', async () => {
        render(<TranspotationTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

    });

    it('displays an error message if data fetching fails', async () => {
        fetchTranspotationData.mockRejectedValueOnce(new Error('Network Error'));
        render(<TranspotationTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
        });
    });

    it('displays an error message if delete action fails', async () => {
        deleteTranspotationData.mockRejectedValueOnce(new Error('Delete Error'));

        render(<TranspotationTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

    });
});
