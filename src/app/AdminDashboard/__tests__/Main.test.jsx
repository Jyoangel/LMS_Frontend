// src/app/AdminDashboard/__tests__/Main.test.jsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main from '../Main/Page';

// Mock fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            count: 100,
            presentCount: 80,
            teacher: 20,
            teacherpresent: 18,
            staffCount: 10,
            staffpresentCount: 9,
        }),
    })
);

// Mock the report card API function
jest.mock('../../../../api/reportcardapi', () => ({
    fetchReportCardData: jest.fn().mockResolvedValue([
        { id: 1, percentage: 85 },
        { id: 2, percentage: 90 },
    ]),
}));

// Mock the event data API function
jest.mock('../../../../api/api', () => ({
    fetcheventData: jest.fn().mockResolvedValue([
        { _id: '1', eventName: 'Sports Day', eventDate: '2024-08-30', eventTime: '10:00 AM', description: 'Sports event', organizerName: 'John Doe' },
        { _id: '2', eventName: 'Science Fair', eventDate: '2024-09-15', eventTime: '9:00 AM', description: 'Science event', organizerName: 'Jane Doe' },
    ]),
}));

describe('Main Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    it('renders loading state initially', () => {
        render(<Main />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });



    it('handles fetch errors correctly', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch data')));

        render(<Main />);

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
        });
    });
});
