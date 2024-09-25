import { render, screen, act, fireEvent } from '@testing-library/react';
import Student from '../Student/page';
import { fetchCountData } from '../../../../api/api';


// Mocking the API calls
jest.mock('../../../../api/api');
//jest.mock('./StudentTable', () => () => <div data-testid="student-table" />);

describe('Student Component', () => {
    beforeEach(() => {
        fetchCountData.mockResolvedValue({ count: 10 }); // Mock resolved value for the API call
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('renders total students count correctly', async () => {
        await act(async () => {
            render(<Student />);
        });

        const totalStudentsElement = screen.getByText(/Total Student: 10/i);
        expect(totalStudentsElement).toBeInTheDocument();
        expect(fetchCountData).toHaveBeenCalledTimes(1); // Ensure API call is made
    });

    test('renders pagination buttons and search input correctly', async () => {
        await act(async () => {
            render(<Student />);
        });

        // Check for search input
        const searchInput = screen.getByPlaceholderText(/Search/i);
        expect(searchInput).toBeInTheDocument();

        // Check for pagination buttons
        const leftButton = screen.getByRole('button', { name: /left/i });
        const rightButton = screen.getByRole('button', { name: /right/i });

        expect(leftButton).toBeInTheDocument();
        expect(rightButton).toBeInTheDocument();
    });



    test('handles search input correctly', async () => {
        await act(async () => {
            render(<Student />);
        });

        // Test the search input functionality
        const searchInput = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchInput, { target: { value: 'John' } });
        expect(searchInput.value).toBe('John');
    });

    test('refresh button is clickable', async () => {
        await act(async () => {
            render(<Student />);
        });

        const refreshButton = screen.getByText(/Refresh/i);
        fireEvent.click(refreshButton);

        expect(refreshButton).toBeInTheDocument();
    });



    test('shows entries dropdown', async () => {
        await act(async () => {
            render(<Student />);
        });

        const dropdown = screen.getByRole('combobox');
        expect(dropdown).toBeInTheDocument();
        expect(dropdown).toHaveDisplayValue('10');
    });
});
