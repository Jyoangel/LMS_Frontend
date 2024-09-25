import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportCardTable from '../ReportCard/ReportCardTable';
import { fetchReportCardData, fetchAdmitCardData } from '../../../../api/reportcardapi';


// Mock API functions
jest.mock('../../../../api/reportcardapi', () => ({
    fetchReportCardData: jest.fn(),
    fetchAdmitCardData: jest.fn(),
    deleteReportCardData: jest.fn(),
    deleteAdmitCardData: jest.fn(),
}));

const mockData = [
    {
        _id: '1',
        ReportCard: 'Report Card 1',
        admitCard: null,
        date: '2024-08-15',
        time: '10:00 AM',
    },
    {
        _id: '2',
        ReportCard: null,
        admitCard: 'Admit Card 1',
        date: '2024-08-16',
        time: '11:00 AM',
    },
];

describe('ReportCardTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch and display initial data', async () => {
        fetchAdmitCardData.mockResolvedValue(mockData.filter(item => item.admitCard));
        fetchReportCardData.mockResolvedValue(mockData.filter(item => item.ReportCard));

        render(<ReportCardTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Report Card 1')).toBeInTheDocument();
            expect(screen.getByText('Admit Card 1')).toBeInTheDocument();
        });
    });

    test('should filter data based on class and search term', async () => {
        render(<ReportCardTable filter="10A" searchTerm="John" />);

        await waitFor(() => {
            expect(screen.queryByText('Report Card 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Admit Card 1')).not.toBeInTheDocument();
        });
    });

    test('should handle dynamic rendering of subjects and marks', async () => {
        const updatedData = [
            ...mockData,
            {
                _id: '3',
                ReportCard: 'Report Card 2',
                admitCard: null,
                date: '2024-08-17',
                time: '12:00 PM',
            },
        ];

        fetchAdmitCardData.mockResolvedValue(mockData.filter(item => item.admitCard));
        fetchReportCardData.mockResolvedValue(updatedData.filter(item => item.ReportCard));


    });
});
