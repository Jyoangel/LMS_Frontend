import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttendanceCalendar from '../Attendance/Calender';
import { useUser } from '@auth0/nextjs-auth0/client';
import dayjs from 'dayjs';

// Mock the Auth0 useUser hook
jest.mock('@auth0/nextjs-auth0/client', () => ({
    useUser: jest.fn(),
}));

describe('AttendanceCalendar Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });





    it('displays correct attendance status for today', async () => {
        useUser.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

        await act(async () => {
            render(<AttendanceCalendar />);
        });

        const today = dayjs().format("YYYY-MM-DD");
        const todayCell = screen.getByTestId(`calendar-cell-${today}`);
        expect(todayCell).toBeInTheDocument();
    });

    it('toggles attendance for today correctly', async () => {
        useUser.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

        await act(async () => {
            render(<AttendanceCalendar />);
        });

        const today = dayjs().format("YYYY-MM-DD");
        const todayCell = screen.getByTestId(`calendar-cell-${today}`);

        fireEvent.click(todayCell);
        await waitFor(() => {
            expect(screen.getByText('Present')).toBeInTheDocument();
        });
    });

    it('does not allow attendance toggle for dates other than today', async () => {
        useUser.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

        await act(async () => {
            render(<AttendanceCalendar />);
        });

        const pastDate = dayjs().subtract(1, 'day').format("YYYY-MM-DD");
        const pastDateCell = screen.queryByTestId(`calendar-cell-${pastDate}`);
        if (pastDateCell) {
            fireEvent.click(pastDateCell);
            await waitFor(() => {
                expect(screen.queryByText('Present')).not.toBeInTheDocument();
            });
        }
    });

    it('does not toggle attendance if already marked for today', async () => {
        useUser.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

        // Mock state to reflect "Present" status for today
        const mockUseState = (init) => [init, jest.fn()];
        jest.spyOn(React, 'useState').mockImplementation(mockUseState({ [dayjs().format("YYYY-MM-DD")]: 'Present' }));

        await act(async () => {
            render(<AttendanceCalendar />);
        });

        const todayCell = screen.getByTestId(`calendar-cell-${dayjs().format("YYYY-MM-DD")}`);
        fireEvent.click(todayCell);
        await waitFor(() => {
            expect(screen.getByText('Present')).toBeInTheDocument();
        });
    });

    it('displays correct styles based on attendance status', async () => {
        useUser.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

        await act(async () => {
            render(<AttendanceCalendar />);
        });

        const today = dayjs().format("YYYY-MM-DD");
        const todayCell = screen.getByTestId(`calendar-cell-${today}`);

        expect(todayCell).toHaveStyle({
            cursor: 'pointer',
            textAlign: 'center',
            padding: '5px',
            borderRadius: '4px',
            backgroundColor: '#e6f7ff',
        });

        fireEvent.click(todayCell);
        await waitFor(() => {
            const updatedTodayCell = screen.getByTestId(`calendar-cell-${today}`);
            expect(updatedTodayCell).toHaveStyle({
                backgroundColor: '#f6ffed',
                opacity: 0.6,
            });
        });
    });
});
