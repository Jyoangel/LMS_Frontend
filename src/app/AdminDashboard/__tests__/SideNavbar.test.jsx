// src/app/AdminDashboard/__tests__/SideNavbar.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidenavbar from '../Navbar/sidenavbar';
import '@testing-library/jest-dom'; // Provides useful matchers for testing-library

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);
jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);

describe('Sidenavbar Component', () => {
    it('renders all navigation buttons correctly', () => {
        render(<Sidenavbar />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Fees')).toBeInTheDocument();
        expect(screen.getByText('Communication')).toBeInTheDocument();
        expect(screen.getByText('Live class')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
        expect(screen.getByText('Payments')).toBeInTheDocument();
        expect(screen.getByText('Hotel Management')).toBeInTheDocument();
        expect(screen.getByText('Enquiry')).toBeInTheDocument();
        expect(screen.getByText('Configuration')).toBeInTheDocument();
    });



    it('navigates to the correct page on button click', () => {
        render(<Sidenavbar />);

        const dashboardLink = screen.getByText('Dashboard').closest('a');
        const feesLink = screen.getByText('Fees').closest('a');

        expect(dashboardLink).toHaveAttribute('href', '/AdminDashboard');
        expect(feesLink).toHaveAttribute('href', '/AdminDashboard/Fees');
    });


});
