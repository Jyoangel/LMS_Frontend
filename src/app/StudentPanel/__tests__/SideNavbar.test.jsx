import { render, screen, fireEvent } from '@testing-library/react';
import Sidenavbar from '../Navbar/Sidenavbar';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Sidenavbar Component', () => {
    beforeEach(() => {
        useRouter.mockImplementation(() => ({
            pathname: '/StudentPanel/Dashboard',
        }));
    });

    test('should render the Sidenavbar component', () => {
        render(<Sidenavbar />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Attendance')).toBeInTheDocument();
        expect(screen.getByText('Assignments')).toBeInTheDocument();
        expect(screen.getByText('Homework')).toBeInTheDocument();
        expect(screen.getByText('Chats')).toBeInTheDocument();
        expect(screen.getByText('Resources')).toBeInTheDocument();
        expect(screen.getByText('Report Card')).toBeInTheDocument();
        expect(screen.getByText('Exam')).toBeInTheDocument();
        expect(screen.getByText('Course')).toBeInTheDocument();
    });

    test('should apply selected style to Dashboard button initially', () => {
        render(<Sidenavbar />);

        const dashboardButton = screen.getByText('Dashboard').parentElement;
        expect(dashboardButton).toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Attendance button is clicked', () => {
        render(<Sidenavbar />);

        const attendanceButton = screen.getByText('Attendance').parentElement;
        fireEvent.click(attendanceButton);

        expect(attendanceButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Homework button is clicked', () => {
        render(<Sidenavbar />);

        const homeworkButton = screen.getByText('Homework').parentElement;
        fireEvent.click(homeworkButton);

        expect(homeworkButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Chats button is clicked', () => {
        render(<Sidenavbar />);

        const chatsButton = screen.getByText('Chats').parentElement;
        fireEvent.click(chatsButton);

        expect(chatsButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Resources button is clicked', () => {
        render(<Sidenavbar />);

        const resourcesButton = screen.getByText('Resources').parentElement;
        fireEvent.click(resourcesButton);

        expect(resourcesButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Report Card button is clicked', () => {
        render(<Sidenavbar />);

        const reportCardButton = screen.getByText('Report Card').parentElement;
        fireEvent.click(reportCardButton);

        expect(reportCardButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Exam button is clicked', () => {
        render(<Sidenavbar />);

        const examButton = screen.getByText('Exam').parentElement;
        fireEvent.click(examButton);

        expect(examButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });

    test('should change selected state when Course button is clicked', () => {
        render(<Sidenavbar />);

        const courseButton = screen.getByText('Course').parentElement;
        fireEvent.click(courseButton);

        expect(courseButton).toHaveClass('bg-blue-600 text-white');
        expect(screen.getByText('Dashboard').parentElement).not.toHaveClass('bg-blue-600 text-white');
    });




});
