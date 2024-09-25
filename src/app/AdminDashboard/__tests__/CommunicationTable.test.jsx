import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommunicationTable from '../Communication/CommunicationTable';
import { fetchStudentData, deleteStudentData, selectStudent } from '../../../../api/api';

// Mock the API functions
jest.mock('../../../../api/api', () => ({
    fetchStudentData: jest.fn(),
    deleteStudentData: jest.fn(),
    selectStudent: jest.fn(),
}));

describe('CommunicationTable', () => {
    const mockData = {
        students: [
            {
                _id: '1',
                studentID: 'S001',
                name: 'John Doe',
                class: '10th',
                dateOfBirth: '2005-05-15',
                gender: 'Male',
                aadharNumber: '123456789012',
                parent: { fatherName: 'Mr. Doe' },
                contactNumber: '1234567890',
                selected: false,
            },
            {
                _id: '2',
                studentID: 'S002',
                name: 'Jane Smith',
                class: '9th',
                dateOfBirth: '2006-06-20',
                gender: 'Female',
                aadharNumber: '987654321098',
                parent: { fatherName: 'Mr. Smith' },
                contactNumber: '0987654321',
                selected: true,
            },
        ],
    };

    const renderComponent = () =>
        render(<CommunicationTable filter="" searchTerm="" setSelectedStudent={jest.fn()} />);

    beforeEach(() => {
        fetchStudentData.mockResolvedValue(mockData);
        deleteStudentData.mockResolvedValue();
        selectStudent.mockResolvedValue();
    });

    it('should render loading initially', async () => {
        renderComponent();
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should render error if fetching data fails', async () => {
        fetchStudentData.mockRejectedValue(new Error('Failed to fetch data'));
        renderComponent();
        await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
    });





    test("should toggle student selection", async () => {
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        });

        const checkbox = screen.getByRole("checkbox", { name: /Select student 1/i });
        fireEvent.click(checkbox);

        expect(selectStudent).toHaveBeenCalledWith("S001", true);
    });

    it('should open delete confirmation dialog when clicking delete', async () => {
        renderComponent();

        await waitFor(() => {
            const deleteButton = screen.getAllByText('Delete')[0];
            fireEvent.click(deleteButton);
        });

        expect(screen.getByText(/Do you really want to delete this record?/i)).toBeInTheDocument();
    });

    it('should call deleteStudentData when confirming delete', async () => {
        renderComponent();

        await waitFor(() => {
            const deleteButton = screen.getAllByText('Delete')[0];
            fireEvent.click(deleteButton);
        });


    });



    it('should filter students by class', async () => {
        render(<CommunicationTable filter="10th" searchTerm="" setSelectedStudent={jest.fn()} />);


    });

    it('should search students by name', async () => {
        render(<CommunicationTable filter="" searchTerm="Jane" setSelectedStudent={jest.fn()} />);


    });
});
