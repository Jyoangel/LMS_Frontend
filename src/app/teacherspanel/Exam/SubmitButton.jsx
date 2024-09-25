"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, textColor }) => {
    const { pending } = useFormStatus();

    return (
        <div className="">
            <button type="submit" className={`${textColor}`}>
                {pending ? "loading" : title}
            </button>
        </div>
    );
};

export default SubmitButton;