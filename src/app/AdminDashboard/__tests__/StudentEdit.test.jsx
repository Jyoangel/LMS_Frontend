import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdateDetails from '../UserManagement/UpdateDetails/[studentID]/page';
import { fetchStudentById, updateStudentData } from '../../../../api/api';

jest.mock('../../../../api/api');

describe('UpdateDetails component', () => {
    const params = { studentID: '123' };
    const formData = {
        studentID: '123',
        formNumber: '456',
        admissionNumber: '789',
        name: 'John Doe',
        class: '10',
        admissionType: 'Regular',
        dateOfBirth: '2000-01-01',
        gender: 'Male',
        nationality: 'Indian',
        motherTongue: 'English',
        religion: 'Hindu',
        caste: 'General',
        bloodGroup: 'A+',
        aadharNumber: '123456789012',
        contactNumber: '1234567890',
        email: 'john.doe@example.com',
        address: '123, Main Street, Anytown, USA',
        parent: {
            fatherName: 'John Doe Sr.',
            fatherContactNumber: '1234567890',
            fatherAadharNumber: '123456789012',
            fatherOccupation: 'Software Engineer',
            motherName: 'Jane Doe',
            motherContactNumber: '1234567890',
            motherAadharNumber: '123456789012',
            motherOccupation: 'Teacher',
            annualIncome: '500000',
            parentAddress: '123, Main Street, Anytown, USA',
        },
        localGuardian: {
            guardianName: 'John Doe Sr.',
            relationWithStudent: 'Father',
            guardianContactNumber: '1234567890',
            guardianAadharNumber: '123456789012',
            guardianOccupation: 'Software Engineer',
            guardianAddress: '123, Main Street, Anytown, USA',
        },
    };

    beforeEach(() => {
        fetchStudentById.mockResolvedValue(formData);
        updateStudentData.mockResolvedValue({ message: 'Student updated successfully!' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it('fetches student data on mount', async () => {
        render(<UpdateDetails params={params} />);
        await waitFor(() => expect(fetchStudentById).toHaveBeenCalledTimes(1));
        expect(fetchStudentById).toHaveBeenCalledWith(params.studentID);
    });

    it('updates student data on submit', async () => {
        const { getByText } = render(<UpdateDetails params={params} />);
        const updateButton = getByText('Update');
        fireEvent.click(updateButton);
        await waitFor(() => expect(updateStudentData).toHaveBeenCalledTimes(1));
        //expect(updateStudentData).toHaveBeenCalledWith(params.studentID, expect.anything());
    });

    it('displays success message on successful update', async () => {
        const { getByText } = render(<UpdateDetails params={params} />);
        const updateButton = getByText('Update');
        fireEvent.click(updateButton);
        await waitFor(() => expect(getByText('Student updated successfully!')).toBeInTheDocument());
    });


});