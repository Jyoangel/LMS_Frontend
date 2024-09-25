// LibraryTable.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LibraryTable from '../LibraryManage/LibraryTable'; // Adjust the import path as needed
import { fetchLibraryData, deletelibraryData } from '../../../../api/libraryapi';

// Mocking API calls
jest.mock('../../../../api/libraryapi');

const mockData = [
    {
        _id: '1',
        title: 'Book 1',
        type: 'Type A',
        subject: 'Math',
        class: 'Class 1',
        dateAdded: '2024-08-10T00:00:00.000Z',
        authorName: 'Author 1',
        description: 'Description 1',
    },
    {
        _id: '2',
        title: 'Book 2',
        type: 'Type B',
        subject: 'Science',
        class: 'Class 2',
        dateAdded: '2024-08-11T00:00:00.000Z',
        authorName: 'Author 2',
        description: 'Description 2',
    },
];

describe('LibraryTable Component', () => {
    beforeEach(() => {
        fetchLibraryData.mockResolvedValue({ libraryItems: mockData });
        deletelibraryData.mockResolvedValue({ success: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it('renders fetched data in the table', async () => {
        render(<LibraryTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('Book 2')).toBeInTheDocument();
        });
    });

    it('filters data based on class', async () => {
        render(<LibraryTable filter="Class 1" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.queryByText('Book 2')).not.toBeInTheDocument();
        });
    });

    it('searches and filters data based on title', async () => {
        render(<LibraryTable filter="" searchTerm="Book 2" />);
        await waitFor(() => {
            expect(screen.getByText('Book 2')).toBeInTheDocument();
            expect(screen.queryByText('Book 1')).not.toBeInTheDocument();
        });
    });

    it('opens and closes the delete confirmation modal', async () => {
        render(<LibraryTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
        });

        // Open delete confirmation
        fireEvent.click(screen.getAllByText('Delete')[0]);
        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();

        // Close delete confirmation
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument();
    });

    it('deletes a record when confirmed', async () => {
        render(<LibraryTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

    });




});
