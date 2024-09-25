import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEnquiry from '../Enquiry/AddEnquiry/page';
import { addEnquiryData } from '../../../../api/enquiryapi';

// Mock the API function
jest.mock('../../../../api/enquiryapi', () => ({
    addEnquiryData: jest.fn(),
}));

describe('AddEnquiry Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddEnquiry component', () => {
        render(<AddEnquiry />);
        expect(screen.getByText(/Back/i)).toBeInTheDocument();
        //expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
    });

    test('initial form state is empty', () => {
        render(<AddEnquiry />);
        expect(screen.getByLabelText(/Name \*/i).value).toBe('');
        expect(screen.getByLabelText(/Contact Number \*/i).value).toBe('');
        expect(screen.getByLabelText(/Email \*/i).value).toBe('');
        expect(screen.getByLabelText(/Enquiry Related \*/i).value).toBe('');
    });

    test('handles input changes', () => {
        render(<AddEnquiry />);
        fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe' } });
        expect(screen.getByLabelText(/Name \*/i).value).toBe('John Doe');
    });

    test('submits form and shows success modal', async () => {
        addEnquiryData.mockResolvedValueOnce({});
        render(<AddEnquiry />);

        fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Contact Number \*/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Enquiry Related \*/i), { target: { value: 'General Inquiry' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(addEnquiryData).toHaveBeenCalledWith({
                name: 'John Doe',
                contactNumber: '1234567890',
                email: 'john.doe@example.com',
                enquiryRelated: 'General Inquiry',
            });
            expect(screen.getByText(/Enquiry Created successfully!/i)).toBeInTheDocument();
        });
    });

    test('resets form fields after successful submission', async () => {
        addEnquiryData.mockResolvedValueOnce({});
        render(<AddEnquiry />);

        // Fill the form fields
        fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Contact Number \*/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Enquiry Related \*/i), { target: { value: 'General Inquiry' } });

        // Submit the form
        fireEvent.click(screen.getByText(/Save/i));

        // Wait for the form to reset
        await waitFor(() => {
            expect(screen.getByLabelText(/Name \*/i).value).toBe('');
            expect(screen.getByLabelText(/Contact Number \*/i).value).toBe('');
            expect(screen.getByLabelText(/Email \*/i).value).toBe('');
            expect(screen.getByLabelText(/Enquiry Related \*/i).value).toBe('');
        });
    });


    test('handles form submission errors', async () => {
        addEnquiryData.mockRejectedValueOnce(new Error('Failed to add enquiry data'));
        render(<AddEnquiry />);

        fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe' } });
        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(screen.queryByText(/Enquiry Created successfully!/i)).not.toBeInTheDocument();
        });
    });



    test('back button navigates to correct route', () => {
        render(<AddEnquiry />);
        fireEvent.click(screen.getByText(/Back/i));
        // Implement a mock for routing and check if it navigates to the expected route
    });
});
