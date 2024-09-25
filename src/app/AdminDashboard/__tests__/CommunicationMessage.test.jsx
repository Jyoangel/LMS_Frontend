import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MessageCard from '../Communication/MessageCard';
import { sendMessages, sendSMS } from '../../../../api/api';

// Mock the API functions
jest.mock('../../../../api/api', () => ({
    sendMessages: jest.fn(),
    sendSMS: jest.fn(),
}));

describe('MessageCard', () => {
    const onCloseMock = jest.fn();
    const selectedStudentMock = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the MessageCard component', () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);

        expect(screen.getByPlaceholderText(/enter subject here/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter message here/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });

    it('closes the MessageCard when the close button is clicked', () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const closeButton = screen.getByRole('button', { name: '' });
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('updates subject and message states when inputs change', () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const subjectInput = screen.getByPlaceholderText(/enter subject here/i);
        const messageTextarea = screen.getByPlaceholderText(/enter message here/i);

        fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
        fireEvent.change(messageTextarea, { target: { value: 'Test Message' } });

        expect(subjectInput.value).toBe('Test Subject');
        expect(messageTextarea.value).toBe('Test Message');
    });

    it('does not send message if subject or message is missing', async () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.click(sendButton);

        expect(sendMessages).not.toHaveBeenCalled();
        expect(sendSMS).not.toHaveBeenCalled();
    });

    it('sends message and SMS when both subject and message are provided', async () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const subjectInput = screen.getByPlaceholderText(/enter subject here/i);
        const messageTextarea = screen.getByPlaceholderText(/enter message here/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
        fireEvent.change(messageTextarea, { target: { value: 'Test Message' } });

        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(sendMessages).toHaveBeenCalledWith('Test Subject', 'Test Message', selectedStudentMock);
            expect(sendSMS).toHaveBeenCalledWith('Test Message', selectedStudentMock);
        });
    });

    it('displays success message after sending', async () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const subjectInput = screen.getByPlaceholderText(/enter subject here/i);
        const messageTextarea = screen.getByPlaceholderText(/enter message here/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
        fireEvent.change(messageTextarea, { target: { value: 'Test Message' } });

        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/message sent successfully!/i)).toBeInTheDocument();
        });
    });

    it('closes the MessageCard after a successful send', async () => {
        render(<MessageCard onClose={onCloseMock} selectedStudent={selectedStudentMock} />);
        const subjectInput = screen.getByPlaceholderText(/enter subject here/i);
        const messageTextarea = screen.getByPlaceholderText(/enter message here/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
        fireEvent.change(messageTextarea, { target: { value: 'Test Message' } });

        fireEvent.click(sendButton);

        // Wait for the success message to appear
        await waitFor(() => {
            expect(screen.getByText(/message sent successfully!/i)).toBeInTheDocument();
        });

        // Ensure the onClose function is called after success
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
