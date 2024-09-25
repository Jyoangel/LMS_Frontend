"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStaffData, selectStaff } from "../../../../api/staffapi"; // Assuming selectStaff is in staffapi
import { format } from "date-fns";

export default function StaffManagementTable({ filter, searchTerm, setSelectedStaff }) {
  const [data, setData] = useState({ staff: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const loadItems = async () => {
    try {
      const data = await fetchStaffData();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredData = data.staff.filter(
    (item) =>
      (filter === "" || item.position === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectStaff = async (staffID, isChecked) => {
    try {
      await selectStaff(staffID, isChecked);
      setData((prevState) => ({
        ...prevState,
        staff: prevState.staff.map((staff) =>
          staff.staffID === staffID ? { ...staff, selected: isChecked } : staff
        ),
      }));
      setSelectedStaff(staffID);
    } catch (error) {
      console.error("Failed to update selected status:", error);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedStaff = filteredData.map((staff) => ({
      ...staff,
      selected: newSelectAll,
    }));

    setData((prevState) => ({
      ...prevState,
      staff: updatedStaff,
    }));

    updatedStaff.forEach((staff) => {
      handleSelectStaff(staff.staffID, newSelectAll);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="bg-blue-200 h-14 py-10">
          <tr className="text-gray-700 text-sm font-normal leading-normal">
            <th className="py-4 px-6 text-left">
              <input
                type="checkbox"
                aria-label="Select All"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Sr. No
            </th>
            <th className="py-4 px-6 text-left">Staff Id</th>
            <th className="py-4 px-6 text-left">Name</th>
            <th className="py-4 px-6 text-left">Email</th>
            <th className="py-4 px-6 text-left">DOB</th>
            <th className="py-4 px-6 text-left">Gender</th>
            <th className="py-4 px-6 text-left">Aadhar No</th>
            <th className="py-4 px-6 text-left">Position</th>
            <th className="py-4 px-6 text-left">Contact No</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
            >
              <td className="py-4 px-6 text-left flex gap-2">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  aria-label={`Select staff ${index + 1}`}
                  onChange={(e) => handleSelectStaff(item.staffID, e.target.checked)}
                />
                {index + 1}
              </td>
              <td className="py-4 px-6 text-left">{item.staffID}</td>
              <td className="py-4 px-6 text-left text-blue-600 underline">
                <Link href={`/AdminDashboard/Fees/FeeDetails/`}>{item.name}</Link>
              </td>
              <td className="py-4 px-6 text-left">{item.email}</td>
              <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
              <td className="py-4 px-6 text-left">{item.gender}</td>
              <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
              <td className="py-4 px-6 text-left">{item.position}</td>
              <td className="py-4 px-6 text-left">{item.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

