import { render, screen, fireEvent, act } from '@testing-library/react';
import ExamDetails from '../Exam/ExamDetails/page'; // Adjust the import path as needed
import { addSExamData } from '../../../../api/examapi'; // Update the path to where the addSExamData function is located

jest.mock('../../../../api/examapi', () => ({
    addSExamData: jest.fn(),
}));

describe('ExamDetails Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render all form fields', () => {
        render(<ExamDetails />);

        expect(screen.getByLabelText('Type*')).toBeInTheDocument();
        expect(screen.getByLabelText('Exam Title*')).toBeInTheDocument();
        expect(screen.getByLabelText('Subject*')).toBeInTheDocument();
        expect(screen.getByLabelText('Date*')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Time*')).toBeInTheDocument();
        expect(screen.getByLabelText('Duration*')).toBeInTheDocument();
        expect(screen.getByLabelText('Instruction*')).toBeInTheDocument();
        expect(screen.getByLabelText('Total Marks*')).toBeInTheDocument();
        expect(screen.getByLabelText('Passing Marks*')).toBeInTheDocument();
        expect(screen.getByLabelText('Upload Question Paper*')).toBeInTheDocument();
    });

    it('should update formData when input values change', () => {
        render(<ExamDetails />);

        const typeInput = screen.getByLabelText('Type*');
        fireEvent.change(typeInput, { target: { value: 'Midterm' } });
        expect(typeInput.value).toBe('Midterm');
    });

    it('should reset the form when Cancel button is clicked', () => {
        render(<ExamDetails />);

        const typeInput = screen.getByLabelText('Type*');
        const cancelButton = screen.getByText('Cancel');

        fireEvent.change(typeInput, { target: { value: 'Midterm' } });
        expect(typeInput.value).toBe('Midterm');

        fireEvent.click(cancelButton);
        expect(typeInput.value).toBe('');
    });

    it('should call addSExamData with form data on submit', async () => {
        addSExamData.mockResolvedValueOnce({});

        render(<ExamDetails />);

        const typeInput = screen.getByLabelText('Type*');
        const examTitleInput = screen.getByLabelText('Exam Title*');
        const subjectInput = screen.getByLabelText('Subject*');
        const dateInput = screen.getByLabelText('Date*');
        const startTimeInput = screen.getByLabelText('Start Time*');
        const durationInput = screen.getByLabelText('Duration*');
        const instructionInput = screen.getByLabelText('Instruction*');
        const totalMarksInput = screen.getByLabelText('Total Marks*');
        const passingMarksInput = screen.getByLabelText('Passing Marks*');
        //const uploadQuestionPaperInput = screen.getByLabelText('Upload Question Paper*');

        fireEvent.change(typeInput, { target: { value: 'Midterm' } });
        fireEvent.change(examTitleInput, { target: { value: 'Math Exam' } });
        fireEvent.change(subjectInput, { target: { value: 'Math' } });
        fireEvent.change(dateInput, { target: { value: '2024-08-01' } });
        fireEvent.change(startTimeInput, { target: { value: '09:00' } });
        fireEvent.change(durationInput, { target: { value: '2 hours' } });
        fireEvent.change(instructionInput, { target: { value: 'No calculators allowed' } });
        fireEvent.change(totalMarksInput, { target: { value: '100' } });
        fireEvent.change(passingMarksInput, { target: { value: '40' } });
        //fireEvent.change(uploadQuestionPaperInput, { target: { value: 'file.pdf' } });

        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        });


    });

    it('should show Successcard on successful form submission', async () => {
        addSExamData.mockResolvedValueOnce({});

        render(<ExamDetails />);

        const typeInput = screen.getByLabelText('Type*');
        fireEvent.change(typeInput, { target: { value: 'Midterm' } });

        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        });

        expect(screen.getByText('Exam added successfully!')).toBeInTheDocument();
    });

    it('should handle form submission error', async () => {
        addSExamData.mockRejectedValueOnce(new Error('Failed to add exam data'));

        render(<ExamDetails />);

        const typeInput = screen.getByLabelText('Type*');
        fireEvent.change(typeInput, { target: { value: 'Midterm' } });

        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        });

        expect(addSExamData).toHaveBeenCalled();
        expect(screen.queryByText('Exam added successfully!')).not.toBeInTheDocument();
    });
});
