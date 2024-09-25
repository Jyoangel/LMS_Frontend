import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import Attendancetable from '../Attendance/[id]/Attendancetable';
import { fetchAttendanceData, updateAttendance } from '../../../../api/attendanceapi';


// Mock the fetchAttendanceData and updateAttendance API functions
jest.mock('../../../../api/attendanceapi', () => ({
    fetchAttendanceData: jest.fn(),
    updateAttendance: jest.fn(),
}));

describe('Attendancetable Component', () => {
    const mockAttendanceData = [
        {
            _id: '1',
            studentId: {
                studentID: 'S123',
                name: 'John Doe',
                class: '5A',
                dateOfBirth: '2010-06-15',
                gender: 'Male',
                aadharNumber: '123456789012',
                parent: { fatherName: 'Mr. Doe' },
                contactNumber: '9876543210',
            },
            present: true,
        },
        {
            _id: '2',
            studentId: {
                studentID: 'S456',
                name: 'Jane Doe',
                class: '5B',
                dateOfBirth: '2011-08-21',
                gender: 'Female',
                aadharNumber: '987654321098',
                parent: { fatherName: 'Mr. Doe' },
                contactNumber: '9876543211',
            },
            present: false,
        },
    ];

    beforeEach(async () => {
        // Mock the fetchAttendanceData function to resolve with mock data
        fetchAttendanceData.mockResolvedValue(mockAttendanceData);

        // Ensure that the component is rendered before every test
        await act(async () => {
            render(<Attendancetable />);
        });
    });

    it('renders table with fetched attendance data', async () => {
        // Verify that table headers are rendered correctly
        expect(screen.getByText('Sr. No')).toBeInTheDocument();
        expect(screen.getByText('Student Id')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Class')).toBeInTheDocument();
        expect(screen.getByText('DOB')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('Aadhar No')).toBeInTheDocument();
        expect(screen.getByText('Father Name')).toBeInTheDocument();
        expect(screen.getByText('Contact No')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();

        // Verify that the attendance data is rendered correctly in the table rows
        await waitFor(() => {
            expect(screen.getByText('S123')).toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('5A')).toBeInTheDocument();
            expect(screen.getByText('2010-06-15')).toBeInTheDocument();
            expect(screen.getByText('Male')).toBeInTheDocument();
            expect(screen.getByText('123456789012')).toBeInTheDocument();
            const fatherNames = screen.getAllByText('Mr. Doe');
            expect(fatherNames).toHaveLength(2);
            expect(screen.getByText('9876543210')).toBeInTheDocument();
            expect(screen.getByText('Present')).toBeInTheDocument();
        });
    });

    it('toggles attendance status when button is clicked', async () => {
        const presentButton = screen.getByText('Present');
        const absentButton = screen.getByText('Absent');

        // Click to change the "Present" to "Absent" for the first student
        await act(async () => {
            fireEvent.click(presentButton);
        });

        expect(presentButton).toHaveTextContent('Absent');
        expect(updateAttendance).toHaveBeenCalledWith('1', false); // Ensure that the API was called with the correct arguments

        // Click to change the "Absent" to "Present" for the second student
        await act(async () => {
            fireEvent.click(absentButton);
        });

        expect(absentButton).toHaveTextContent('Present');
        expect(updateAttendance).toHaveBeenCalledWith('2', true);
    });

    it('reverts status change on update failure', async () => {
        const presentButton = screen.getByText('Present');

        // Mock the updateAttendance function to fail
        updateAttendance.mockRejectedValueOnce(new Error('Update failed'));

        // Try toggling the attendance status
        await act(async () => {
            fireEvent.click(presentButton);
        });

        // Verify the button text reverts to original state after failure
        await waitFor(() => {
            expect(presentButton).toHaveTextContent('Present');
        });
    });


});
