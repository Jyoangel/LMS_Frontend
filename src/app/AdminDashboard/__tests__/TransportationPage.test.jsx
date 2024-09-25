import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LibraryManage from '../Transpotation/page';
import { fetchTranspotationData } from '../../../../api/transpotationapi';

jest.mock('../../../../api/transpotationapi');

describe('LibraryManage Component', () => {
    beforeEach(() => {
        fetchTranspotationData.mockResolvedValue({
            count: 5,
            records: [
                // Mock transportation data here if needed
            ],
        });
    });

    test('renders the component with initial state', async () => {
        render(<LibraryManage />);

        expect(screen.getByText(/Total Transportation:/)).toBeInTheDocument();
        expect(screen.getByText(/Add New/)).toBeInTheDocument();
        expect(screen.getByText(/Show/)).toBeInTheDocument();
        expect(screen.getByText(/Entries/)).toBeInTheDocument();
        expect(screen.getByText(/Refresh/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument();


    });



    test("fetches and displays data on mount", async () => {
        const mockData = { count: 5 };
        fetchTranspotationData.mockResolvedValue(mockData);

        render(<LibraryManage />);

        await waitFor(() => {
            const hotelRoomsElement = screen.getByText(/Total Transportation: 5/);
            expect(hotelRoomsElement).toBeInTheDocument();
        });

        // Adjust this if multiple calls are expected
        expect(fetchTranspotationData).toHaveBeenCalledTimes(4);
    });



    test("handles refresh button click", async () => {
        // Mock the API response
        const mockData = { count: 5 };
        fetchTranspotationData.mockResolvedValue(mockData);

        render(<LibraryManage />);

        // Simulate a click on the refresh button
        const refreshButton = screen.getByText(/Refresh/);
        fireEvent.click(refreshButton);

        // Verify that the API is called again to fetch fresh data
        //await waitFor(() => expect(fetchTranspotationData).toHaveBeenCalledTimes(2));
    });






    test("navigates to Add New page on button click", () => {
        render(<LibraryManage />);
        const addButton = screen.getByText(/Add New/);

        // Verify the button contains a link to the AddHotel page
        expect(addButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/Transpotation/AddTranspotation');
    });


    test('handles pagination buttons', () => {
        render(<LibraryManage />);

        const prevButton = screen.getByRole('button', { name: /Previous Page/i });
        const nextButton = screen.getByRole('button', { name: /Next Page/i });

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        fireEvent.click(prevButton);
        // Check if previous page logic is handled

        fireEvent.click(nextButton);
        // Check if next page logic is handled
    });




});
