import { render, screen, fireEvent, act } from '@testing-library/react';
import Sidenavbar from '../components/Navbar/Sidenavbar';
import '@testing-library/jest-dom';
import { useRouter } from "next/router";

// Mock the useRouter function
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));


describe('Sidenavbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all sidebar buttons with correct text and icons', async () => {
        await act(async () => {
            render(<Sidenavbar />);
        });

        // Check if all sidebar buttons are rendered with correct text
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Attendance')).toBeInTheDocument();
        expect(screen.getByText('Assignments')).toBeInTheDocument();
        expect(screen.getByText('Students')).toBeInTheDocument();
        expect(screen.getByText('Classes')).toBeInTheDocument();
        expect(screen.getByText('Chats')).toBeInTheDocument();
        expect(screen.getByText('Library')).toBeInTheDocument();
        expect(screen.getByText('Report Card')).toBeInTheDocument();
        expect(screen.getByText('Exam')).toBeInTheDocument();
        expect(screen.getByText('Course')).toBeInTheDocument();
    });

    it('should apply "bg-blue-600" class when a button is selected', async () => {
        await act(async () => {
            render(<Sidenavbar />);
        });

        const dashboardButton = screen.getByText('Dashboard').parentElement;
        const attendanceButton = screen.getByText('Attendance').parentElement;

        // Check initial state (Dashboard should be selected by default)
        expect(dashboardButton).toHaveClass('bg-blue-600');
        expect(attendanceButton).not.toHaveClass('bg-blue-600');

        // Click on the Attendance button
        await act(async () => {
            fireEvent.click(attendanceButton);
        });

        // Check if Attendance is selected now and Dashboard is deselected
        expect(attendanceButton).toHaveClass('bg-blue-600');
        expect(dashboardButton).not.toHaveClass('bg-blue-600');
    });

    it('should update isSelected state on button click', async () => {
        await act(async () => {
            render(<Sidenavbar />);
        });

        const dashboardButton = screen.getByText('Dashboard').parentElement;
        const attendanceButton = screen.getByText('Attendance').parentElement;

        // Click Attendance button
        await act(async () => {
            fireEvent.click(attendanceButton);
        });

        // Check if state has changed
        expect(attendanceButton).toHaveClass('bg-blue-600');
        expect(dashboardButton).not.toHaveClass('bg-blue-600');

        // Click Dashboard button again
        await act(async () => {
            fireEvent.click(dashboardButton);
        });

        // Check if state reverts back
        expect(dashboardButton).toHaveClass('bg-blue-600');
        expect(attendanceButton).not.toHaveClass('bg-blue-600');
    });




    it('should apply the correct icon inversion depending on selection', async () => {
        await act(async () => {
            render(<Sidenavbar />);
        });

        const dashboardIcon = screen.getByAltText('dashboard');


        // Check initial state (Dashboard icon should not be inverted, Attendance should be)
        expect(dashboardIcon).toHaveClass('invert-0');


        // Click Attendance button
        await act(async () => {
            fireEvent.click(dashboardIcon.closest('button'));
        });



    });
});
