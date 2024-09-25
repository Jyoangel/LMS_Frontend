import { render, screen, fireEvent } from '@testing-library/react';
import FeesTable from '../Fees/Component/FeesTable';
import FeeNotice2 from '../Fees/Component/FeeNotice2';
import FeeSlip from '../Fees/Component/FeeSlip';
import { fetchFeeData } from '../../../../api/api';

jest.mock('../../../../api/api');
jest.mock('../Fees/Component/FeeNotice2');
jest.mock('../Fees/Component/FeeSlip');

describe('FeesTable Component', () => {
    const mockFeesData = [
        {
            _id: '1',
            studentID: {
                studentID: '1001',
                name: 'John Doe',
                class: '10th Grade',
                dateOfBirth: '2005-01-01',
                gender: 'Male',
                aadharNumber: '123456789012',
                parent: { fatherName: 'Mr. Doe' },
                contactNumber: '9876543210',
            },
            paidAmount: 5000,
            dueAmount: 1000,
        },
        {
            _id: '2',
            studentID: {
                studentID: '1002',
                name: 'Jane Smith',
                class: '9th Grade',
                dateOfBirth: '2006-05-15',
                gender: 'Female',
                aadharNumber: '987654321098',
                parent: { fatherName: 'Mr. Smith' },
                contactNumber: '8765432109',
            },
            paidAmount: 3000,
            dueAmount: 2000,
        },
    ];

    beforeEach(() => {
        fetchFeeData.mockResolvedValue({
            fees: mockFeesData,
            totalFeesCount: 2,
            totalPaidAmount: 8000,
        });
    });

    it('renders loading state initially', () => {
        render(<FeesTable filter="" searchTerm="" />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it('renders error message on fetch failure', async () => {
        fetchFeeData.mockRejectedValueOnce(new Error('Failed to fetch data'));
        render(<FeesTable filter="" searchTerm="" />);
        const errorMessage = await screen.findByText(/error: failed to fetch data/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('renders the table with data after fetch', async () => {
        render(<FeesTable filter="" searchTerm="" />);
        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(mockFeesData.length + 1); // +1 for the header row
    });

    it('filters data by search term', async () => {
        render(<FeesTable filter="" searchTerm="John" />);

        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(2); // 1 header + 1 data row
    });

    it('filters data by class filter', async () => {
        render(<FeesTable filter="10A" searchTerm="" />);

        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(1); // 1 header + 1 data row
    });

    it('renders fee slip when "View Fee Slip" is clicked', async () => {
        render(<FeesTable filter="" searchTerm="" />);

        const button = await screen.findAllByTestId('view-fee-slip');
        fireEvent.click(button[0]);


    });

    it('renders due notice when "View Due Notice" is clicked', async () => {
        render(<FeesTable filter="" searchTerm="" />);

        const button = await screen.findAllByTestId('view-due-notice');
        fireEvent.click(button[0]);


    });
    it('closes fee slip when onClose is triggered', async () => {
        FeeSlip.mockImplementation(({ onClose }) => (
            <div data-testid="fee-slip">
                Fee Slip
                <button onClick={onClose}>Close</button>
            </div>
        ));

        render(<FeesTable filter="" searchTerm="" />);
        const button = await screen.findAllByTestId('view-due-notice');
        fireEvent.click(button[0]);


    });



    it('closes due notice when onClose is triggered', async () => {
        FeeNotice2.mockImplementation(({ onClose }) => (
            <div data-testid="fee-notice">
                Due Notice
                <button onClick={onClose}>Close</button>
            </div>
        ));

        render(<FeesTable filter="" searchTerm="" />);
        const button = await screen.findAllByTestId('view-due-notice');
        fireEvent.click(button[0]);

    });
});
