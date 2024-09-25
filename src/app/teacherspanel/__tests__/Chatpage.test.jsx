// Chat.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../Chats/page';
import io from 'socket.io-client';

// Mock the socket.io-client
jest.mock('socket.io-client', () => {
    const mSocket = {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    };
    return jest.fn(() => mSocket);
});

const mockSocket = io();

// Mock useUser hook from @auth0/nextjs-auth0
jest.mock('@auth0/nextjs-auth0/client', () => ({
    useUser: () => ({
        user: { name: 'Test User', email: 'test@example.com' },
        error: null,
        isLoading: false,
    }),
}));

describe('Chat Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders initial UI elements', () => {
        render(<Chat />);
        expect(screen.getByTestId('messages')).toBeInTheDocument();
        expect(screen.getByTestId('input')).toBeInTheDocument();
        expect(screen.getByTestId('send-button')).toBeInTheDocument();
    });

    test('sends a message', async () => {
        render(<Chat />);

        const input = screen.getByTestId('input');
        const sendButton = screen.getByTestId('send-button');

        fireEvent.change(input, { target: { value: 'Hello World' } });
        fireEvent.click(sendButton);


    });

    test('receives and displays a message', async () => {
        render(<Chat />);

        const mockMessage = { text: 'Hello from server', isOwnMessage: false };

        // Simulate receiving a message
        await act(async () => {
            mockSocket.on.mock.calls[0][1](mockMessage); // Call the mock handler
        });


    });

    test('handles input change', () => {
        render(<Chat />);

        const input = screen.getByTestId('input');
        fireEvent.change(input, { target: { value: 'Test message' } });

        expect(input.value).toBe('Test message');
    });


});
