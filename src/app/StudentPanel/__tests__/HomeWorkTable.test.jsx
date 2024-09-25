import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HomeworkTable from '../Homework/HomeworkTable';
import { fetchHomeWorkData } from '../../../../api/homeworkapi';
import '@testing-library/jest-dom';

// Mock the fetchHomeWorkData API function
jest.mock('../../../../api/homeworkapi');

describe('HomeworkTable Component', () => {
    const mockHomeworkData = {
        homeworks: [
            {
                homework: 'Math Homework',
                subjects: 'Mathematics',
                chapter: 'Chapter 1',
                startDate: '2024-08-01T00:00:00.000Z',
                endDate: '2024-08-07T00:00:00.000Z',
                attachments: 'attachment1.pdf',
                teacher: 'Kamlesh Kumar',
                class: '10th Grade',
            },
            {
                homework: 'Science Homework',
                subjects: 'Science',
                chapter: 'Chapter 2',
                startDate: '2024-08-02T00:00:00.000Z',
                endDate: '2024-08-08T00:00:00.000Z',
                attachments: 'attachment2.pdf',
                teacher: 'Kamlesh Kumar',
                class: '10th Grade',
            },
        ],
    };

    beforeEach(async () => {
        fetchHomeWorkData.mockResolvedValue(mockHomeworkData);
    });

    it('renders homework data correctly', async () => {
        await act(async () => {
            render(<HomeworkTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('Math Homework')).toBeInTheDocument();
        expect(screen.getByText('Science Homework')).toBeInTheDocument();
        expect(screen.getByText('Mathematics')).toBeInTheDocument();
        expect(screen.getByText('Science')).toBeInTheDocument();
        expect(screen.getByText('Chapter 1')).toBeInTheDocument();
        expect(screen.getByText('Chapter 2')).toBeInTheDocument();
        expect(screen.getByText('2024-08-01')).toBeInTheDocument();
        expect(screen.getByText('2024-08-07')).toBeInTheDocument();
        expect(screen.getByText('2024-08-02')).toBeInTheDocument();
        expect(screen.getByText('2024-08-08')).toBeInTheDocument();
        expect(screen.getByText('attachment1.pdf')).toBeInTheDocument();
        expect(screen.getByText('attachment2.pdf')).toBeInTheDocument();
    });

    it('filters homework data correctly based on class', async () => {
        await act(async () => {
            render(<HomeworkTable filter="10th Grade" searchTerm="" />);
        });

        expect(screen.getByText('Math Homework')).toBeInTheDocument();
        expect(screen.getByText('Science Homework')).toBeInTheDocument();

        // Check that it only shows data for 10th Grade
        expect(screen.queryByText('9th Grade Homework')).not.toBeInTheDocument();
    });



    it('renders correct number of rows', async () => {
        await act(async () => {
            render(<HomeworkTable filter="" searchTerm="" />);
        });

        // Including header row
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(mockHomeworkData.homeworks.length + 1);
    });





    it('renders attachments correctly', async () => {
        await act(async () => {
            render(<HomeworkTable filter="" searchTerm="" />);
        });

        expect(screen.getByText('attachment1.pdf')).toBeInTheDocument();
        expect(screen.getByText('attachment2.pdf')).toBeInTheDocument();
    });

    it('renders download image correctly', async () => {
        await act(async () => {
            render(<HomeworkTable filter="" searchTerm="" />);
        });

        const downloadImages = screen.getAllByAltText('download');
        expect(downloadImages.length).toBe(mockHomeworkData.homeworks.length);
    });
});
