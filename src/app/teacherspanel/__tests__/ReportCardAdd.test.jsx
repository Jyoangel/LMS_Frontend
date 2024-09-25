import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddReportCard from '../ReportCard/AddReportCard/page';
import { addReportCardData } from '../../../../api/reportcardapi';


// Mock the API function
jest.mock('../../../../api/reportcardapi', () => ({
    addReportCardData: jest.fn(),
}));

jest.mock('../../../Components/Successcard', () => jest.fn(() => <div>Success Modal</div>));

describe('AddReportCard Component', () => {
    beforeEach(() => {
        render(<AddReportCard />);
    });

    it('renders all form fields', () => {
        expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name/i, { selector: 'input[name="name"]' })).toBeInTheDocument();

        expect(screen.getByLabelText(/Father Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Session/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Roll Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class/i, { selector: 'input[name="class"]' })).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number Of Subjects/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class Teacher/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Principle Signature/i, { selector: 'input[name="principleSignature"]' })).toBeInTheDocument();
    });

    it('updates formData state on input change', () => {
        fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'Mid Term' } });
        expect(screen.getByLabelText(/Type/i)).toHaveValue('Mid Term');

        fireEvent.change(screen.getByLabelText(/Name/i, { selector: 'input[name="name"]' }), { target: { value: "Jane Doe" } });
        expect(screen.getByLabelText(/Name/i, { selector: 'input[name="name"]' })).toHaveValue('Jane Doe');
    });

    it('updates the subjects array on number of subjects change', () => {
        fireEvent.change(screen.getByLabelText(/Number Of Subjects/i), { target: { value: '3' } });
        expect(screen.getAllByLabelText(/Subject Name/i)).toHaveLength(3);
        expect(screen.getAllByLabelText(/Marks/i)).toHaveLength(3);
    });

    it('updates individual subject details on input change', () => {
        fireEvent.change(screen.getByLabelText(/Number Of Subjects/i), { target: { value: '2' } });

        fireEvent.change(screen.getAllByLabelText(/Subject Name/i)[0], { target: { value: 'Math' } });
        expect(screen.getAllByLabelText(/Subject Name/i)[0]).toHaveValue('Math');

        fireEvent.change(screen.getAllByLabelText(/Marks/i)[0], { target: { value: '85' } });
        expect(screen.getAllByLabelText(/Marks/i)[0]).toHaveValue(85);
    });

    test("calls addReportCardData with correct form data on form submission", async () => {
        render(<AddReportCard />);

        fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "Final Term" } });
        fireEvent.change(screen.getByLabelText(/Name/i, { selector: 'input[name="name"]' }), { target: { value: "Jane Doe" } });
        fireEvent.change(screen.getByLabelText(/Father Name/i, { selector: 'input[name="fatherName"]' }), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText(/Session/i), { target: { value: "2023-2024" } });
        fireEvent.change(screen.getByLabelText(/Roll Number/i), { target: { value: "12" } });
        fireEvent.change(screen.getByLabelText(/Class/i, { selector: 'input[name="class"]' }), { target: { value: "10th Grade" } });

        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "2008-05-15" } });
        fireEvent.change(screen.getByLabelText(/Number Of Subjects/i), { target: { value: "3" } });

        const subjectNameInputs = screen.getAllByLabelText(/Subject Name\*/i);
        fireEvent.change(subjectNameInputs[0], { target: { value: 'Mathematics' } });
        const marksInputs = screen.getAllByLabelText(/Marks\*/i);
        fireEvent.change(marksInputs[0], { target: { value: '95' } }); // Adjust the index if necessary


        fireEvent.change(screen.getByLabelText("Class Teacher*"), { target: { value: "Ms. Smith" } });
        fireEvent.change(screen.getByLabelText("Principle Signature*"), { target: { value: "Mr. Johnson" } });





    });

    it('shows success modal on successful form submission', async () => {
        addReportCardData.mockResolvedValueOnce({ success: true });

        fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));

        expect(await screen.findByText(/Success Modal/i)).toBeInTheDocument();
    });


});
