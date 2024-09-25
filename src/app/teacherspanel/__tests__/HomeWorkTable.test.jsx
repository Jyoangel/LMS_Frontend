// __tests__/ClassesTable.test.js
import { render, screen, fireEvent, act } from '@testing-library/react';
import ClassesTable from '../Classes/ClassesTable';
import { fetchHomeWorkData, deleteHomeWorkData } from '../../../../api/homeworkapi';
import { format } from 'date-fns';
import '@testing-library/jest-dom';

// Mock API functions
jest.mock('../../../../api/homeworkapi', () => ({
    fetchHomeWorkData: jest.fn(),
    deleteHomeWorkData: jest.fn(),
}));

// Sample data
const mockHomeworkData = [
    {
        _id: '1',
        class: 'Math',
        assignTo: 'John Doe',
        homework: 'Chapter 5 Exercises',
        startDate: '2024-08-01',
        endDate: '2024-08-07',
        homeworkDone: 'Completed',
        undoneHomework: 'None',
        action: { edit: 'Edit', delete: 'Delete' }
    },
    // Add more mock data if needed
];

describe('ClassesTable Component', () => {
    beforeEach(() => {
        fetchHomeWorkData.mockResolvedValue({ homeworks: mockHomeworkData });
        deleteHomeWorkData.mockResolvedValue({});
    });

    test('renders the table with data', async () => {
        await act(async () => {
            render(<ClassesTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('Math')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Chapter 5 Exercises')).toBeInTheDocument();
        expect(screen.getByText('2024-08-01')).toBeInTheDocument();
        expect(screen.getByText('2024-08-07')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('None')).toBeInTheDocument();
    });

    test('opens delete confirmation dialog on delete button click', async () => {
        await act(async () => {
            render(<ClassesTable filter="" searchTerm="" />);
        });

        fireEvent.click(screen.getByText('Delete'));
        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();
    });

    test('closes delete confirmation dialog on cancel button click', async () => {
        await act(async () => {
            render(<ClassesTable filter="" searchTerm="" />);
        });

        fireEvent.click(screen.getByText('Delete'));
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument();
    });



    test('filters data based on filter and search term', async () => {
        await act(async () => {
            render(<ClassesTable filter="Math" searchTerm="Chapter 5" />);
        });

        expect(screen.getByText('Math')).toBeInTheDocument();
        expect(screen.getByText('Chapter 5 Exercises')).toBeInTheDocument();
    });

    test('does not render rows with non-matching filter and search term', async () => {
        await act(async () => {
            render(<ClassesTable filter="Science" searchTerm="Test" />);
        });

        expect(screen.queryByText('Math')).not.toBeInTheDocument();
        expect(screen.queryByText('Chapter 5 Exercises')).not.toBeInTheDocument();
    });

    test('renders links correctly', async () => {
        await act(async () => {
            render(<ClassesTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('Chapter 5 Exercises').closest('a')).toHaveAttribute('href', '/teacherspanel/Classes/HomeWorkName');
        expect(screen.getByText('Math').closest('a')).toHaveAttribute('href', '/AdminDashboard/LiveClassScreen/CourseName');
    });
});
