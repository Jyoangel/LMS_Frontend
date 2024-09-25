import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubjectTable from '../Subject/SubjectTable';
import { fetchSubjectData, deleteSubjectData } from '../../../../api/subjectapi';

jest.mock('../../../../api/subjectapi', () => ({
    fetchSubjectData: jest.fn(),
    deleteSubjectData: jest.fn(),
}));

describe('SubjectTable Component', () => {
    const mockSubjects = [
        { _id: '1', subject: 'Math', class: '10', date: '2024-08-12T00:00:00Z', time: '10:00 AM' },
        { _id: '2', subject: 'Science', class: '9', date: '2024-08-13T00:00:00Z', time: '11:00 AM' },
    ];

    beforeEach(() => {
        fetchSubjectData.mockResolvedValue({ subjects: mockSubjects });
    });

    it('should render subject table with data', async () => {
        render(<SubjectTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
            expect(screen.getByText('Science')).toBeInTheDocument();
        });
    });

    it('should filter subjects based on class', async () => {
        render(<SubjectTable filter="10" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
            expect(screen.queryByText('Science')).toBeNull();
        });
    });

    it('should filter subjects based on search term', async () => {
        render(<SubjectTable filter="" searchTerm="Math" />);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
            expect(screen.queryByText('Science')).toBeNull();
        });
    });

    {/*it('should open and close delete confirmation dialog', async () => {
        render(<SubjectTable filter="" searchTerm="" />);

        // Locate the Delete button using a more flexible approach
        const deleteButtons = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Cancel'));

        await waitFor(() => {
            expect(screen.queryByText('Do you really want to delete this record?')).toBeNull();
        });
    });

    it('should handle delete action', async () => {
        deleteSubjectData.mockResolvedValueOnce({});

        render(<SubjectTable filter="" searchTerm="" />);

        // Locate the Delete button using a more flexible approach
        const deleteButtons = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButtons[0]);
        fireEvent.click(screen.getByText('Confirm'));

        await waitFor(() => {
            expect(deleteSubjectData).toHaveBeenCalledWith('1');
            expect(screen.queryByText('Math')).toBeNull();
        });
    });
    */}
});
