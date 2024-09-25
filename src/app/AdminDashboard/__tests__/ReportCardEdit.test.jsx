import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditReportCard from '../ReportCard/EditReportCard/[id]/page';
import { fetchReportCardById, updateReportCardData } from '../../../../api/reportcardapi';
import Successcard from '@/Components/Successcard';

// Mock API functions
jest.mock('../../../../api/reportcardapi', () => ({
    fetchReportCardById: jest.fn(),
    updateReportCardData: jest.fn(),
}));

jest.mock('../../../Components/Successcard', () => jest.fn(() => <div>Success Modal</div>));


const mockReportCardData = {
    type: "Term",
    name: "John Doe",
    fatherName: "James Doe",
    class: "10A",
    session: "2024",
    rollNumber: "123456",
    dateOfBirth: "2008-01-01",
    numberOfSubjects: "3",
    subjects: [
        { subjectName: "Math", marks: "95" },
        { subjectName: "English", marks: "88" },
        { subjectName: "Science", marks: "92" },
    ],
    classTeacher: "Ms. Smith",
    principleSignature: "Mr. Brown",
};

describe('EditReportCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch and display initial report card data on load', async () => {
        fetchReportCardById.mockResolvedValue(mockReportCardData);

        await act(async () => {
            render(<EditReportCard params={{ id: '1' }} />);
        });
        await waitFor(() => {
            // Check static fields
            expect(screen.getByLabelText(/Type\*/i)).toHaveValue(mockReportCardData.type);
            expect(screen.getByTestId('name-input')).toHaveValue(mockReportCardData.name);
            expect(screen.getByLabelText(/Father Name\*/i)).toHaveValue(mockReportCardData.fatherName);
            expect(screen.getByLabelText(/Class\*/i)).toHaveValue(mockReportCardData.class);
            expect(screen.getByLabelText(/Session\*/i)).toHaveValue(mockReportCardData.session);
            expect(screen.getByLabelText(/Roll Number\*/i)).toHaveValue(mockReportCardData.rollNumber);
            expect(screen.getByLabelText(/Date of Birth\*/i)).toHaveValue(mockReportCardData.dateOfBirth);
            expect(screen.getByLabelText(/Number Of Subjects\*/i)).toHaveValue(mockReportCardData.numberOfSubjects);
            expect(screen.getByLabelText(/Class Teacher\*/i)).toHaveValue(mockReportCardData.classTeacher);
            expect(screen.getByLabelText(/Principal Signature\*/i)).toHaveValue(mockReportCardData.principleSignature);

            // Check dynamic subject fields
            mockReportCardData.subjects.forEach((subject, index) => {
                expect(screen.getByTestId(`subject-name-input-${index}`)).toHaveValue(subject.subjectName);
                expect(screen.getByTestId(`marks-input-${index}`)).toHaveValue(subject.marks);
            });
        });
    });

    test('should update form data on input change', async () => {
        await act(async () => {
            render(<EditReportCard params={{ id: '1' }} />);
        });

        fireEvent.change(screen.getByLabelText(/Type\*/i), { target: { value: 'Midterm' } });
        fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Jane Doe' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/Type\*/i)).toHaveValue('Midterm');
            expect(screen.getByTestId('name-input')).toHaveValue('Jane Doe');
        });
    });

    test('should handle subject fields dynamically', async () => {
        fetchReportCardById.mockResolvedValue(mockReportCardData);

        await act(async () => {
            render(<EditReportCard params={{ id: '1' }} />);
        });

        // Wait for the initial subject fields to be rendered
        await waitFor(() => {
            // Check the initial number of subject fields
            expect(screen.getAllByTestId(/subject-name-input-/i)).toHaveLength(mockReportCardData.subjects.length);
            expect(screen.getAllByTestId(/marks-input-/i)).toHaveLength(mockReportCardData.subjects.length);
        });

        // Simulate selecting a new number of subjects
        fireEvent.change(screen.getByLabelText(/Number Of Subjects\*/i), { target: { value: '3' } });

        // Wait for the component to re-render with the new subject fields
        await waitFor(() => {
            // Check if new subject fields are added
            expect(screen.getAllByTestId(/subject-name-input-/i)).toHaveLength(3);
            expect(screen.getAllByTestId(/marks-input-/i)).toHaveLength(3);
        });
    });

    test('shows success modal on successful form submission', async () => {
        updateReportCardData.mockResolvedValueOnce({ success: true });

        await act(async () => {
            render(<EditReportCard params={{ id: '1' }} />);
        });

        // Find the form element and submit it
        const formElement = screen.getByTestId('form'); // Assuming the form has a role="form"

        await act(async () => {
            fireEvent.submit(formElement);
        });

        // Check if the success modal is displayed
        expect(await screen.findByText(/Success Modal/i)).toBeInTheDocument();
    });
});
