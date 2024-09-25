import { render, screen, act } from '@testing-library/react';
import LibraryTable from '../Library/LibraryTable';  // Path to your component
import { fetchLibraryData } from '../../../../api/libraryapi';

// Mock the fetchLibraryData API
jest.mock('../../../../api/libraryapi', () => ({
    fetchLibraryData: jest.fn(),
}));

const mockLibraryData = {
    libraryItems: [
        {
            _id: '1',
            title: 'Math Book',
            type: 'Book',
            subject: 'Mathematics',
            class: '10',
            dateAdded: '2023-08-20T00:00:00.000Z',
            authorName: 'John Doe',
            description: 'A comprehensive math book.',
        },
        {
            _id: '2',
            title: 'Physics Notes',
            type: 'Notes',
            subject: 'Physics',
            class: '12',
            dateAdded: '2023-08-19T00:00:00.000Z',
            authorName: 'Jane Smith',
            description: 'Physics notes on quantum mechanics.',
        },
    ],
};

describe('LibraryTable Component', () => {
    // Reset mock before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('Sr. No')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
        expect(screen.getByText('Subject')).toBeInTheDocument();
    });

    it('fetches and displays library data', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="" />);
        });

        expect(fetchLibraryData).toHaveBeenCalledTimes(1);

        // Check if the table rows are rendered correctly
        expect(screen.getByText('Math Book')).toBeInTheDocument();
        expect(screen.getByText('Physics Notes')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('filters library data by class', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="12" searchTerm="" />);
        });

        expect(fetchLibraryData).toHaveBeenCalled();

        // Only the item with class '12' should be displayed
        expect(screen.getByText('Physics Notes')).toBeInTheDocument();
        expect(screen.queryByText('Math Book')).toBeNull(); // Should not render 'Math Book'
    });

    it('filters library data by search term', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="math" />);
        });

        expect(fetchLibraryData).toHaveBeenCalled();

        // Only the item with title 'Math Book' should be displayed
        expect(screen.getByText('Math Book')).toBeInTheDocument();
        expect(screen.queryByText('Physics Notes')).toBeNull(); // Should not render 'Physics Notes'
    });

    it('displays "Edit" button for each row', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="" />);
        });

        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toHaveLength(2);  // There are 2 rows, so 2 Edit buttons
    });

    it('displays no rows when there is no matching data', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="11" searchTerm="" />);
        });

        // No data should match filter "11"
        expect(screen.queryByText('Math Book')).toBeNull();
        expect(screen.queryByText('Physics Notes')).toBeNull();
    });

    it('displays the correct date format for dateAdded', async () => {
        fetchLibraryData.mockResolvedValue(mockLibraryData);

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('2023-08-20')).toBeInTheDocument();
        expect(screen.getByText('2023-08-19')).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        fetchLibraryData.mockRejectedValue(new Error('Failed to fetch'));

        await act(async () => {
            render(<LibraryTable filter="" searchTerm="" />);
        });

        // The component should still render despite the error
        expect(screen.getByText('Sr. No')).toBeInTheDocument();
    });
});
