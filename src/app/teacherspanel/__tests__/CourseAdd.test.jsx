import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseDetail from '../Course/CourseDetails/page';
import '@testing-library/jest-dom';
import { addCourseData } from '../../../../api/courseapi';

// Mock the API call
jest.mock('../../../../api/courseapi', () => ({
    addCourseData: jest.fn(),
}));

describe('CourseDetail Component', () => {
    beforeEach(() => {
        render(<CourseDetail />);
    });

    it('renders the form with all input fields', () => {
        expect(screen.getByLabelText('Course Name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Course Code*')).toBeInTheDocument();
        expect(screen.getByLabelText('Instructor Name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Instructor Email*')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Date*')).toBeInTheDocument();
        expect(screen.getByLabelText('End Date*')).toBeInTheDocument();
        expect(screen.getByLabelText('Class Days*')).toBeInTheDocument();
        expect(screen.getByLabelText('Class Time*')).toBeInTheDocument();
        expect(screen.getByLabelText('Course Objectives*')).toBeInTheDocument();
        expect(screen.getByLabelText('Supplementary Materials')).toBeInTheDocument();
        expect(screen.getByLabelText('Online Resources')).toBeInTheDocument();
        expect(screen.getByLabelText('Course Description*')).toBeInTheDocument();
    });

    it('should allow user to input course details', () => {
        fireEvent.change(screen.getByLabelText('Course Name*'), {
            target: { value: 'Mathematics' },
        });
        fireEvent.change(screen.getByLabelText('Course Code*'), {
            target: { value: 'MATH101' },
        });
        fireEvent.change(screen.getByLabelText('Instructor Name*'), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText('Instructor Email*'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Start Date*'), {
            target: { value: '2024-09-01' },
        });
        fireEvent.change(screen.getByLabelText('End Date*'), {
            target: { value: '2024-12-15' },
        });
        fireEvent.change(screen.getByLabelText('Class Days*'), {
            target: { value: 'Monday, Wednesday, Friday' },
        });
        fireEvent.change(screen.getByLabelText('Class Time*'), {
            target: { value: '10:00' },
        });

        expect(screen.getByLabelText('Course Name*').value).toBe('Mathematics');
        expect(screen.getByLabelText('Course Code*').value).toBe('MATH101');
        expect(screen.getByLabelText('Instructor Name*').value).toBe('John Doe');
        expect(screen.getByLabelText('Instructor Email*').value).toBe('john@example.com');
        expect(screen.getByLabelText('Start Date*').value).toBe('2024-09-01');
        expect(screen.getByLabelText('End Date*').value).toBe('2024-12-15');
        expect(screen.getByLabelText('Class Days*').value).toBe('Monday, Wednesday, Friday');
        expect(screen.getByLabelText('Class Time*').value).toBe('10:00');
    });

    it('should handle form submission and show success modal', async () => {
        fireEvent.change(screen.getByLabelText('Course Name*'), {
            target: { value: 'Mathematics' },
        });
        fireEvent.change(screen.getByLabelText('Course Code*'), {
            target: { value: 'MATH101' },
        });
        fireEvent.change(screen.getByLabelText('Instructor Name*'), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText('Instructor Email*'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Start Date*'), {
            target: { value: '2024-09-01' },
        });
        fireEvent.change(screen.getByLabelText('End Date*'), {
            target: { value: '2024-12-15' },
        });
        fireEvent.change(screen.getByLabelText('Class Days*'), {
            target: { value: 'Monday, Wednesday, Friday' },
        });
        fireEvent.change(screen.getByLabelText('Class Time*'), {
            target: { value: '10:00 AM' },
        });

        addCourseData.mockResolvedValueOnce({ success: true });

        fireEvent.submit(screen.getByRole('button', { name: /Save/i }));


        expect(addCourseData).toHaveBeenCalledWith({
            courseName: 'Mathematics',
            courseCode: 'MATH101',
            primaryInstructorname: 'John Doe',
            instructorEmail: 'john@example.com',
            schedule: {
                startDate: '2024-09-01',
                endDate: '2024-12-15',
                classDays: ['Monday', 'Wednesday', 'Friday'],
                classTime: '10:00',
            },
            courseObjectives: '',
            supplementaryMaterials: '',
            onlineResources: '',
            courseDescription: '',
        });

        // Verify form reset after successful submission
        //expect(screen.getByLabelText('Course Name*').value).toBe('');
        //expect(screen.getByLabelText('Course Code*').value).toBe('');
    });

    it('should handle API errors gracefully', async () => {
        addCourseData.mockRejectedValueOnce(new Error('Failed to create course'));

        fireEvent.submit(screen.getByRole('button', { name: /Save/i }));

        await waitFor(() => expect(addCourseData).toHaveBeenCalled());

        // Optionally check for error handling UI, e.g., error message
    });

    it('should convert class time to 24-hour format', () => {
        fireEvent.change(screen.getByLabelText('Class Time*'), {
            target: { value: '02:30 PM' },
        });

        expect(screen.getByLabelText('Class Time*').value).toBe('14:30');
    });
});
