"use client";

import { useState } from "react";
import { deleteCourseData } from "../actions/course";
import ConfirmationCard from "@/Components/ConfirmationCard";
import toast from "react-hot-toast";

const DeleteButton = ({ id }) => {
    const [isDelete, setDelete] = useState(false);

    const openDelete = () => {
        setDelete(true);
    };

    const closeDelete = () => {
        setDelete(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await deleteCourseData(id);
        if (response?.error) {
            toast.error(response.error);
        } else {
            toast.success("Course deleted successfully");
            closeDelete();
            // Optionally, refresh the page or update the state to remove the deleted course from the UI.
        }
    };

    return (
        <>
            <button onClick={openDelete} className="text-red-600">
                Delete
            </button>
            {isDelete && (
                <ConfirmationCard
                    para={"Do you really want to delete this record?"}
                    onClose={closeDelete}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
};

export default DeleteButton;
