// __tests__/AddHomeWork.test.js

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddHomeWork from '../Classes/AddHomeWork/page';
import { addHomeworkData } from '../../../../api/homeworkapi';
import Successcard from '@/Components/Successcard';

// Mock the API function
jest.mock('../../../../api/homeworkapi', () => ({
    addHomeworkData: jest.fn(),
}));

describe('AddHomeWork Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddHomeWork component and form elements', () => {
        render(<AddHomeWork />);

        // Check if the form elements are present
        expect(screen.getByLabelText(/Class \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subjects \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Chapter \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Home Work \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Submission Method \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Assign To \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Attachments \*/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description \*/)).toBeInTheDocument();
    });

    test('handles form input changes', async () => {
        render(<AddHomeWork />);

        // Change input values
        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '1A' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Math' } });

        expect(screen.getByDisplayValue('1A')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Math')).toBeInTheDocument();
    });

    test('submits the form and shows success message', async () => {
        addHomeworkData.mockResolvedValue({});

        render(<AddHomeWork />);

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '1A' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Math' } });
        fireEvent.change(screen.getByLabelText(/Chapter \*/), { target: { value: 'Chapter 1' } });
        fireEvent.change(screen.getByLabelText(/Home Work \*/), { target: { value: 'Exercise 1' } });
        fireEvent.change(screen.getByLabelText(/Submission Method \*/), { target: { value: 'Online' } });
        fireEvent.change(screen.getByLabelText(/Start Date \*/), { target: { value: '2024-08-20' } });
        fireEvent.change(screen.getByLabelText(/End Date \*/), { target: { value: '2024-08-27' } });
        fireEvent.change(screen.getByLabelText(/Assign To \*/), { target: { value: 'All Students' } });
        fireEvent.change(screen.getByLabelText(/Attachments \*/), { target: { value: 'homework.pdf' } });
        fireEvent.change(screen.getByLabelText(/Description \*/), { target: { value: 'Complete by next week' } });

        await act(async () => {
            fireEvent.click(screen.getByText(/Save/));
        });

        await waitFor(() => {
            expect(addHomeworkData).toHaveBeenCalledWith({
                class: '1A',
                subjects: 'Math',
                chapter: 'Chapter 1',
                homework: 'Exercise 1',
                submissionMethod: 'Online',
                startDate: '2024-08-20',
                endDate: '2024-08-27',
                assignTo: 'All Students',
                attachments: 'homework.pdf',
                description: 'Complete by next week'
            });
            expect(screen.getByText(/Homework created successfully!/)).toBeInTheDocument();
        });
    });

    test('handles form submission errors', async () => {
        addHomeworkData.mockRejectedValue(new Error('Failed to add homework'));

        render(<AddHomeWork />);

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '1A' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Math' } });
        fireEvent.change(screen.getByLabelText(/Chapter \*/), { target: { value: 'Chapter 1' } });
        fireEvent.change(screen.getByLabelText(/Home Work \*/), { target: { value: 'Exercise 1' } });
        fireEvent.change(screen.getByLabelText(/Submission Method \*/), { target: { value: 'Online' } });
        fireEvent.change(screen.getByLabelText(/Start Date \*/), { target: { value: '2024-08-20' } });
        fireEvent.change(screen.getByLabelText(/End Date \*/), { target: { value: '2024-08-27' } });
        fireEvent.change(screen.getByLabelText(/Assign To \*/), { target: { value: 'All Students' } });
        fireEvent.change(screen.getByLabelText(/Attachments \*/), { target: { value: 'homework.pdf' } });
        fireEvent.change(screen.getByLabelText(/Description \*/), { target: { value: 'Complete by next week' } });

        await act(async () => {
            fireEvent.click(screen.getByText(/Save/));
        });

        await waitFor(() => {
            expect(addHomeworkData).toHaveBeenCalledWith({
                class: '1A',
                subjects: 'Math',
                chapter: 'Chapter 1',
                homework: 'Exercise 1',
                submissionMethod: 'Online',
                startDate: '2024-08-20',
                endDate: '2024-08-27',
                assignTo: 'All Students',
                attachments: 'homework.pdf',
                description: 'Complete by next week'
            });
            expect(screen.queryByText(/Homework created successfully!/)).toBeNull();
        });
    });

    test('resets form data on cancel', () => {
        render(<AddHomeWork />);

        // Fill out the form and cancel
        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '1A' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Math' } });

        fireEvent.click(screen.getByText(/Cancel/));

        // Check if the form is reset
        expect(screen.getByLabelText(/Class \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Subjects \*/)).toHaveValue('');
    });

    test('displays success message and handles modal close', async () => {
        render(<AddHomeWork />);

        // Simulate form submission
        addHomeworkData.mockResolvedValue({});
        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '1A' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Math' } });
        fireEvent.click(screen.getByText(/Save/));




    });
});
