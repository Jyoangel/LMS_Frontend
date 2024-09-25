"use client";
import Successcard from "@/Components/Successcard";
import { useEffect, useRef, useState } from "react";

export default function ConfirmationCard({ onClose, onConfirm, para }) {
  const [isDelete, setDelete] = useState(false);



  const successRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (successRef.current && !successRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div
          ref={successRef}
          className="w-[320px] h-[180px] flex flex-col items-center justify-center gap-3 p-3 bg-white rounded-lg
        "
        >
          {" "}
          <h1 className="text-xl font-bold">Confirmation</h1>
          <h1 className="text-sm font-normal">{para}</h1>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onConfirm}
              className="mt-4 bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Yes
            </button>
            <button
              className="mt-4 text-blue-600 border border-blue-600  font-bold py-2 px-4 rounded-md"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
        {isDelete && (
          <Successcard
            para={"Access provided successfully"}
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
}
