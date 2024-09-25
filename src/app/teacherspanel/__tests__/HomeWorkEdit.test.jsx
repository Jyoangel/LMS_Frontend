import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditDetails from '../Classes/EditDetails/[id]/page'; // Update path as needed
import { fetchHomeWorkById, updateHomeWorkData } from '../../../../api/homeworkapi'; // Update path as needed
import Successcard from '@/Components/Successcard';

// Mock API functions
jest.mock('../../../../api/homeworkapi', () => ({
    fetchHomeWorkById: jest.fn(),
    updateHomeWorkData: jest.fn(),
}));

describe('EditDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches and displays homework data on mount', async () => {
        const mockData = {
            class: '1A',
            subjects: 'Math',
            chapter: 'Chapter 1',
            homework: 'Homework 1',
            submissionMethod: 'Online',
            startDate: '2024-08-01',
            endDate: '2024-08-10',
            assignTo: 'Student A',
            attachments: 'file.pdf',
            description: 'Description of the homework',
        };

        fetchHomeWorkById.mockResolvedValue(mockData);

        await act(async () => {
            render(<EditDetails params={{ id: '123' }} />);
        });

        expect(screen.getByLabelText(/Class \*/)).toHaveValue('1A');
        expect(screen.getByLabelText(/Subjects \*/)).toHaveValue('Math');
        expect(screen.getByLabelText(/Chapter \*/)).toHaveValue('Chapter 1');
        expect(screen.getByLabelText(/Home Work \*/)).toHaveValue('Homework 1');
        expect(screen.getByLabelText(/Submission Method \*/)).toHaveValue('Online');
        expect(screen.getByLabelText(/Start Date \*/)).toHaveValue('2024-08-01');
        expect(screen.getByLabelText(/End Date \*/)).toHaveValue('2024-08-10');
        expect(screen.getByLabelText(/Assign To \*/)).toHaveValue('Student A');
        expect(screen.getByLabelText(/Attachments \*/)).toHaveValue('file.pdf');
        expect(screen.getByLabelText(/Description \*/)).toHaveValue('Description of the homework');
    });

    it('updates homework data on form submission', async () => {
        const mockData = {
            class: '1A',
            subjects: 'Math',
            chapter: 'Chapter 1',
            homework: 'Homework 1',
            submissionMethod: 'Online',
            startDate: '2024-08-01',
            endDate: '2024-08-10',
            assignTo: 'Student A',
            attachments: 'file.pdf',
            description: 'Description of the homework',
        };

        fetchHomeWorkById.mockResolvedValue(mockData);
        updateHomeWorkData.mockResolvedValue({});

        await act(async () => {
            render(<EditDetails params={{ id: '123' }} />);
        });

        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '2B' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Science' } });
        fireEvent.change(screen.getByLabelText(/Chapter \*/), { target: { value: 'Chapter 2' } });
        fireEvent.change(screen.getByLabelText(/Home Work \*/), { target: { value: 'Homework 2' } });
        fireEvent.change(screen.getByLabelText(/Submission Method \*/), { target: { value: 'Offline' } });
        fireEvent.change(screen.getByLabelText(/Start Date \*/), { target: { value: '2024-08-05' } });
        fireEvent.change(screen.getByLabelText(/End Date \*/), { target: { value: '2024-08-15' } });
        fireEvent.change(screen.getByLabelText(/Assign To \*/), { target: { value: 'Student B' } });
        fireEvent.change(screen.getByLabelText(/Attachments \*/), { target: { value: 'newfile.pdf' } });
        fireEvent.change(screen.getByLabelText(/Description \*/), { target: { value: 'Updated description' } });

        await act(async () => {
            fireEvent.click(screen.getByTestId(/Update/));
        });

        expect(updateHomeWorkData).toHaveBeenCalledWith('123', {
            class: '2B',
            subjects: 'Science',
            chapter: 'Chapter 2',
            homework: 'Homework 2',
            submissionMethod: 'Offline',
            startDate: '2024-08-05',
            endDate: '2024-08-15',
            assignTo: 'Student B',
            attachments: 'newfile.pdf',
            description: 'Updated description',
        });
    });

    it('shows success card on successful update', async () => {
        const mockData = {
            class: '1A',
            subjects: 'Math',
            chapter: 'Chapter 1',
            homework: 'Homework 1',
            submissionMethod: 'Online',
            startDate: '2024-08-01',
            endDate: '2024-08-10',
            assignTo: 'Student A',
            attachments: 'file.pdf',
            description: 'Description of the homework',
        };

        fetchHomeWorkById.mockResolvedValue(mockData);
        updateHomeWorkData.mockResolvedValue({});

        await act(async () => {
            render(<EditDetails params={{ id: '123' }} />);
        });

        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '2B' } });
        fireEvent.change(screen.getByLabelText(/Subjects \*/), { target: { value: 'Science' } });

        await act(async () => {
            fireEvent.click(screen.getByText(/Update/));
        });

        expect(screen.getByText(/Homework updated successfully!/)).toBeInTheDocument();
    });

    it('resets form fields on cancel button click', async () => {
        const mockData = {
            class: '1A',
            subjects: 'Math',
            chapter: 'Chapter 1',
            homework: 'Homework 1',
            submissionMethod: 'Online',
            startDate: '2024-08-01',
            endDate: '2024-08-10',
            assignTo: 'Student A',
            attachments: 'file.pdf',
            description: 'Description of the homework',
        };

        fetchHomeWorkById.mockResolvedValue(mockData);

        await act(async () => {
            render(<EditDetails params={{ id: '123' }} />);
        });

        fireEvent.change(screen.getByLabelText(/Class \*/), { target: { value: '2B' } });

        await act(async () => {
            fireEvent.click(screen.getByText(/Cancel/));
        });

        expect(screen.getByLabelText(/Class \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Subjects \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Chapter \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Home Work \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Submission Method \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Start Date \*/)).toHaveValue('');
        expect(screen.getByLabelText(/End Date \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Assign To \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Attachments \*/)).toHaveValue('');
        expect(screen.getByLabelText(/Description \*/)).toHaveValue('');
    });
});
