import React from 'react';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides useful matchers for testing-library
import UpperNavbar from '../components/Navbar/Uppernavbar';
import { useUser } from '@auth0/nextjs-auth0/client';


// Mock modules
jest.mock('@auth0/nextjs-auth0/client', () => ({
    useUser: jest.fn(),
}));

jest.mock('next/image', () => ({ src, alt, width, height }) => (
    <img src={src} alt={alt} width={width} height={height} />
));

jest.mock('react-icons/io', () => ({
    IoIosArrowDown: ({ size, onClick, className }) => (
        <div onClick={onClick} className={className} style={{ fontSize: size }} />
    ),
}));

describe('UpperNavbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state when isLoading is true', () => {
        useUser.mockReturnValue({ user: null, error: null, isLoading: true });
        render(<UpperNavbar />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error message when there is an error', () => {
        useUser.mockReturnValue({ user: null, error: { message: 'An error occurred' }, isLoading: false });
        render(<UpperNavbar />);
        expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });

    it('renders user information when user is loaded', () => {
        useUser.mockReturnValue({
            user: { nickname: 'John Doe', picture: '/path/to/picture.png' },
            error: null,
            isLoading: false,
        });
        render(<UpperNavbar />);
        expect(screen.getByText('Welcome John Doe')).toBeInTheDocument();

    });

    it('shows default name when user is not loaded', () => {
        useUser.mockReturnValue({
            user: null,
            error: null,
            isLoading: false,
        });
        render(<UpperNavbar />);
        expect(screen.getByText('Welcome name')).toBeInTheDocument();
    });


});
