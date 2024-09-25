import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AdmitCard from '../ReportCard/AdmitCard/page'; // Adjust the import path
import { addAdmitCardData } from '../../../../api/reportcardapi'; // Adjust this import

jest.mock('../../../../api/reportcardapi', () => ({
    addAdmitCardData: jest.fn()
}));

describe('AdmitCard Component', () => {
    test('renders the form fields correctly', () => {
        render(<AdmitCard />);

        // Check if form fields are rendered
        expect(screen.getByLabelText(/Examination Roll No\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/School Name\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Session\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Examination\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Student Name\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Exam Starting Time\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Exam Ending Time\*/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Exam Subject/i)).toBeInTheDocument();
    });

    test('handles input change correctly', () => {
        render(<AdmitCard />);

        // Simulate input change
        fireEvent.change(screen.getByLabelText(/Examination Roll No\*/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByLabelText(/School Name\*/i), { target: { value: 'ABC School' } });

        // Check if values are updated in the formData state
        expect(screen.getByLabelText(/Examination Roll No\*/i).value).toBe('12345');
        expect(screen.getByLabelText(/School Name\*/i).value).toBe('ABC School');
    });

    test('adds a new subject field correctly', () => {
        render(<AdmitCard />);

        // Click to add a new subject field
        fireEvent.click(screen.getByText(/Add Subject/i));

        // Check if new subject fields are rendered
        expect(screen.getAllByLabelText(/Subject\*/i).length).toBeGreaterThan(1);
        expect(screen.getAllByLabelText(/Examination Date\*/i).length).toBeGreaterThan(1);
    });

    test('handles subject input changes correctly', () => {
        render(<AdmitCard />);

        // Add a new subject field
        fireEvent.click(screen.getByText(/Add Subject/i));

        // Simulate input change in the newly added subject field
        fireEvent.change(screen.getAllByLabelText(/Subject\*/i)[1], { target: { value: 'Mathematics' } });
        fireEvent.change(screen.getAllByLabelText(/Examination Date\*/i)[1], { target: { value: '2024-08-15' } });

        // Check if values are updated correctly
        expect(screen.getAllByLabelText(/Subject\*/i)[1].value).toBe('Mathematics');
        expect(screen.getAllByLabelText(/Examination Date\*/i)[1].value).toBe('2024-08-15');
    });

    test('submits form data correctly', async () => {
        render(<AdmitCard />);

        // Fill in form fields
        fireEvent.change(screen.getByLabelText(/Examination Roll No\*/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByLabelText(/School Name\*/i), { target: { value: 'ABC School' } });
        fireEvent.change(screen.getByLabelText(/Session\*/i), { target: { value: '2023-2024' } });
        fireEvent.change(screen.getByLabelText(/Examination\*/i), { target: { value: 'Final Exam' } });
        fireEvent.change(screen.getByLabelText(/Student Name\*/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Class\*/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Start Date\*/i), { target: { value: '2024-08-01' } });
        fireEvent.change(screen.getByLabelText(/End Date\*/i), { target: { value: '2024-08-15' } });
        fireEvent.change(screen.getByLabelText(/Exam Starting Time\*/i), { target: { value: '09:00' } });
        fireEvent.change(screen.getByLabelText(/Exam Ending Time\*/i), { target: { value: '12:00' } });

        // Add a subject field
        fireEvent.click(screen.getByText(/Add Subject/i));
        fireEvent.change(screen.getAllByLabelText(/Subject\*/i)[1], { target: { value: 'Mathematics' } });
        fireEvent.change(screen.getAllByLabelText(/Examination Date\*/i)[1], { target: { value: '2024-08-10' } });



    });

    it(' form submission', async () => {
        addAdmitCardData.mockResolvedValueOnce({ success: true });
        await act(async () => {
            render(<AdmitCard />);
        });

        const formElement = screen.getByTestId('form'); // Assuming the form has a role="form"

        await act(async () => {
            fireEvent.submit(formElement);
        });



    });


});
