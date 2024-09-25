import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeeSlip from '../Fees/Component/FeeSlip';
import { fetchFeeRecordById } from '../../../../api/api';

// Mock the fetchFeeRecordById API call
jest.mock('../../../../api/api', () => ({
    fetchFeeRecordById: jest.fn(),
}));

const mockFeeDetails = {
    registrationNo: '123456',
    number: '1234567890',
    schoolEmail: 'school@example.com',
    session: '2023-2024',
    receiptNo: '001',
    referenceNo: 'ABC123',
    date: '2024-01-01',
    srNo: 'SR001',
    studentID: {
        class: '10',
        name: 'John Doe',
        dateOfBirth: '2008-01-01',
        parent: { fatherName: 'Mr. Doe' },
        address: '123 Main St',
    },
    feeMonth: 'January',
    monthlyFee: 2000,
    festiveFee: 500,
    total: 3000,
    dueAmount: 500,
    totalFee: 3500,
    paidAmount: 3000,
    amountInWords: 'Three Thousand Only',
    paymentMode: 'Cash',
    bankName: 'XYZ Bank',
    remark: 'N/A',
    printDate: '2024-01-02T12:00:00Z',
    receiptBy: 'Admin',
};

describe('FeeSlip Component', () => {
    beforeEach(() => {
        fetchFeeRecordById.mockResolvedValue(mockFeeDetails);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(<FeeSlip onClose={jest.fn()} feeId="1" />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches and displays fee details', async () => {
        render(<FeeSlip onClose={jest.fn()} feeId="1" />);
        expect(await screen.findByText('Gyan Ganga Public School')).toBeInTheDocument();
        expect(screen.getByText('Registration No- 123456')).toBeInTheDocument();
        expect(screen.getByText('Receipt No:001')).toBeInTheDocument();
        expect(screen.getByText('Monthly Fee')).toBeInTheDocument();
        expect(screen.getByText('2000')).toBeInTheDocument();

    });

    test('calls onClose when close button is clicked', async () => {
        const onCloseMock = jest.fn();
        render(<FeeSlip onClose={onCloseMock} feeId="1" />);
        const closeButton = await screen.findByRole('button');
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when clicking outside the notice', async () => {
        const onCloseMock = jest.fn();
        render(<FeeSlip onClose={onCloseMock} feeId="1" />);
        const outsideArea = await screen.findByTestId('feeslip-outside-area');
        fireEvent.mouseDown(outsideArea);

    });

    test('does not call onClose when clicking inside the notice', async () => {
        const onCloseMock = jest.fn();
        render(<FeeSlip onClose={onCloseMock} feeId="1" />);
        const noticeArea = await screen.findByTestId('feeslip-notice-area');
        fireEvent.mouseDown(noticeArea);
        expect(onCloseMock).not.toHaveBeenCalled();
    });


});
