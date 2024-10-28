"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addStudentData } from "../../../../../api/api"; // add student api 
import { useUser } from '@auth0/nextjs-auth0/client';

export default function StudentDetails() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  //if (isLoading) return <div>Loading...</div>; // Show loading state

  const initialFormData = {
    studentID: '',
    formNumber: '',
    admissionNumber: '',
    class: '',
    admissionType: '',
    name: '',
    nationality: '',
    motherTongue: '',
    dateOfBirth: '',
    gender: '',
    religion: '',
    caste: '',
    bloodGroup: '',
    aadharNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    totalFee: "",
    session: "",
    userId: user ? user.sub : '',
    parent: {
      fatherName: '',
      fatherContactNumber: '',
      fatherAadharNumber: '',
      fatherOccupation: '',
      motherName: '',
      motherContactNumber: '',
      motherAadharNumber: '',
      motherOccupation: '',
      annualIncome: '',
      parentAddress: ''
    },
    localGuardian: {
      guardianName: '',
      relationWithStudent: '',
      guardianContactNumber: '',
      guardianAadharNumber: '',
      guardianOccupation: '',
      guardianAddress: ''
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validation, setValidation] = useState({
    isContactNumberValid: true,
    isEmailValid: true,
    isAadharValid: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset validity on change for contact number and email
    if (name === "contactNumber") {
      setValidation((prev) => ({ ...prev, isContactNumberValid: true }));
    } else if (name === "email") {
      setValidation((prev) => ({ ...prev, isEmailValid: true }));
    } else if (name === "aadharNumber") {
      setValidation((prev) => ({ ...prev, isAadharValid: true }));
    }
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      parent: {
        ...prevData.parent,
        [name]: value
      }
    }));

    // Reset validity on change for parent contact number and Aadhar number
    if (name === "fatherContactNumber") {
      setValidation((prev) => ({ ...prev, isContactNumberValid: true }));
    } else if (name === "motherContactNumber") {
      setValidation((prev) => ({ ...prev, isContactNumberValid: true }));
    } else if (name === "fatherAadharNumber") {
      setValidation((prev) => ({ ...prev, isAadharValid: true }));
    } else if (name === "motherAadharNumber") {
      setValidation((prev) => ({ ...prev, isAadharValid: true }));
    }
  };

  // Add similar handle change functions for local guardian if needed
  const handleLocalGuardianChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      localGuardian: {
        ...prevData.localGuardian,
        [name]: value
      }
    }));

    // Reset validity on change for local guardian contact number and Aadhar number
    if (name === "guardianContactNumber") {
      setValidation((prev) => ({ ...prev, isContactNumberValid: true }));
    } else if (name === "guardianAadharNumber") {
      setValidation((prev) => ({ ...prev, isAadharValid: true }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      studentID,
      formNumber,
      admissionNumber,
      class: className,
      admissionType,
      name,
      nationality,
      motherTongue,
      dateOfBirth,
      gender,
      religion,
      caste,
      bloodGroup,
      aadharNumber,
      contactNumber,
      email,
      address,
      totalFee,
      session,
      parent,
      localGuardian
    } = formData;

    if (!studentID || !formNumber || !admissionNumber || !className || !admissionType || !name || !nationality ||
      !motherTongue || !dateOfBirth || !gender || !religion || !caste || !bloodGroup || !aadharNumber ||
      !contactNumber || !email || !address || !totalFee || !session || !parent || !localGuardian) {
      alert("Please fill in all required fields in the main section.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNumberPattern = /^\d{10}$/;
    const aadharPattern = /^(?!.*(\d)\1{11})\d{12}$/;

    // Check individual fields and update validity state accordingly

    // Validate email format
    //const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setValidation({ isEmailValid: false }); // Update email validity
      alert("Please enter a valid email address.");
      return;
    }

    // Validate contact number (for simplicity, let's assume it should be a 10-digit number)
    //const contactNumberPattern = /^\d{10}$/;
    if (!contactNumberPattern.test(contactNumber)) {
      setValidation({ isContactNumberValid: false }); // Update contact number validity
      alert("Please enter a valid contact number (10 digits).");
      return;
    }

    // Validate aadhar number (12-digit number for India)
    //const aadharPattern = /^(?!.*(\d)\1{11})\d{12}$/;
    if (!aadharPattern.test(aadharNumber)) {
      setValidation({ isAadharValid: false });
      alert("Please enter a valid 12-digit Aadhar number.");
      return;
    }
    // Validate parent contact numbers
    if (formData.parent.fatherContactNumber && !contactNumberPattern.test(formData.parent.fatherContactNumber)) {
      setValidation({ isContactNumberValid: false });
      alert("Please enter a valid 10-digit father contact number.");
      return;
    }

    if (formData.parent.motherContactNumber && !contactNumberPattern.test(formData.parent.motherContactNumber)) {
      setValidation({ isContactNumberValid: false });
      alert("Please enter a valid 10-digit mother contact number.");
      return;
    }

    // Validate parent Aadhar numbers
    if (formData.parent.fatherAadharNumber && !aadharPattern.test(formData.parent.fatherAadharNumber)) {
      setValidation({ isAadharValid: false });
      alert("Please enter a valid 12-digit father Aadhar number.");
      return;
    }

    if (formData.parent.motherAadharNumber && !aadharPattern.test(formData.parent.motherAadharNumber)) {
      setValidation({ isAadharValid: false });
      alert("Please enter a valid 12-digit mother Aadhar number.");
      return;
    }

    // Validate local guardian contact number
    if (formData.localGuardian.guardianContactNumber && !contactNumberPattern.test(formData.localGuardian.guardianContactNumber)) {
      setValidation({ isContactNumberValid: false });
      alert("Please enter a valid 10-digit guardian contact number.");
      return;
    }

    // Validate local guardian Aadhar number
    if (formData.localGuardian.guardianAadharNumber && !aadharPattern.test(formData.localGuardian.guardianAadharNumber)) {
      setValidation({ isAadharValid: false });
      alert("Please enter a valid 12-digit guardian Aadhar number.");
      return;
    }

    try {
      await addStudentData(formData);
      console.log('Student created successfully');
      setFormData(initialFormData);
      setValidation({ isContactNumberValid: true, isEmailValid: true, isAadharValid: true });
      openModal();
    } catch (error) {
      console.error('Error creating student:', error);
      alert(`Error: ${error.message}`);
    }
  };




  return (
    <>

      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/UserManagement"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Student Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="studentID" className="text-lg font-normal text-black">Student ID*</label>
                <input
                  id="studentID"
                  type="text"
                  placeholder="Type here"
                  name="studentID"
                  value={formData.studentID}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="formNumber" className="text-lg font-normal text-black">Form Number*</label>
                <input
                  id="formNumber"
                  type="text"
                  placeholder="Type here"
                  name="formNumber"
                  value={formData.formNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Admission Number**/}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="admissionNumber" className="text-lg font-normal text-black">
                  Admission Number*
                </label>
                <input
                  id="admissionNumber"
                  type="text"
                  placeholder="Type here"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Name*/}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="name" className="text-lg font-normal text-black">Name*</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Type here"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Class */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="class" className="text-lg font-normal text-black">Class*</label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400">
                    Select
                  </option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="admissionType" className="text-lg font-normal text-black">Admission Type*</label>
                <input
                  id="admissionType"
                  type="text"
                  placeholder="Type here"
                  name="admissionType"
                  value={formData.admissionType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="dateofBirth" className="text-lg font-normal text-black">
                  Date of Birth*
                </label>
                <input
                  id="dateofBirth"
                  type="date"
                  placeholder="Type here"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="gender" className="text-lg font-normal text-black">Gender*</label>
                <select
                  id="gender"
                  type="text"
                  placeholder="Type here"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Nationality */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="nationality" className="text-lg font-normal text-black">Nationality*</label>
                <select
                  id="nationality"
                  type="text"
                  placeholder="Type here"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="Other">Other</option>
                </select>
              </div>


              {/* Mother Tongue */}
              {/* Mother Tongue */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="motherTounge" className="text-lg font-normal text-black">
                  Mother Tongue*
                </label>
                <select
                  id="motherTounge"
                  type="text"
                  placeholder="Type here"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Religion */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="religion" className="text-lg font-normal text-black">Religion*</label>
                <select
                  id="religion"
                  type="text"
                  placeholder="Type here"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Caste */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="caste" className="text-lg font-normal text-black">Caste*</label>
                <select
                  id="caste"
                  type="text"
                  placeholder="Type here"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              {/* Blood Group */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="bloodGroup" className="text-lg font-normal text-black">
                  Blood Group*
                </label>
                <select
                  id="bloodGroup"
                  type="text"
                  placeholder="Type here"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                  <option value="AB-">NA</option>
                </select>
              </div>

              {/* Aadhar Number */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="aadharNumber" className="text-lg font-normal text-black">
                  Aadhar Number*
                </label>
                <input
                  id="aadharNumber"
                  type="text"
                  placeholder="Type here"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  style={{
                    color: validation.isAadharValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="contactNumber" className="text-lg font-normal text-black">
                  Contact Number*
                </label>
                <input
                  id="contactNumber"
                  type="text"
                  placeholder="Type here"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={{
                    color: validation.isContactNumberValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Email*</label>
                <input
                  type="email"
                  placeholder="Type here"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    color: validation.isEmailValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              {/* Total Fee */}
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="totalFee"
                  className="text-lg font-normal text-black">
                  Total Fee *
                </label>
                <input
                  id="totalFee"
                  type="text"
                  name="totalFee"
                  placeholder="Enter total fee"
                  value={formData.totalFee}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              {/* Session */}
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="session"
                  className="text-lg font-normal text-black">
                  Session *
                </label>
                <input
                  id="session"
                  type="text"
                  name="session"
                  placeholder="Enter session"
                  value={formData.session}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>
          </div>




          {/* Address */}
          <div className="flex flex-col gap-3 w-full col-span-3">
            <label className="text-lg font-normal text-black">Address*</label>
            <textarea
              type="text"
              placeholder="Type here"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>


          {/* Parent's Details */}
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Parent&apos;s Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Father&apos;s Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="fatherName"
                  value={formData.parent.fatherName}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Father Contact Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Father Contact Number*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="fatherContactNumber"
                  value={formData.parent.fatherContactNumber}
                  onChange={handleParentChange}
                  style={{
                    color: validation.isContactNumberValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Father Aadhar Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Father Aadhar Number*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="fatherAadharNumber"
                  value={formData.parent.fatherAadharNumber}
                  onChange={handleParentChange}
                  style={{
                    color: validation.isAadharValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Father Occupation */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Father Occupation*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="fatherOccupation"
                  value={formData.parent.fatherOccupation}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Mother Name */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Mother Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="motherName"
                  value={formData.parent.motherName}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Mother Contact Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Mother Contact Number*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="motherContactNumber"
                  value={formData.parent.motherContactNumber}
                  onChange={handleParentChange}
                  style={{
                    color: validation.isContactNumberValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Mother Aadhar Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Mother Aadhar Number*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="motherAadharNumber"
                  value={formData.parent.motherAadharNumber}
                  onChange={handleParentChange}
                  style={{
                    color: validation.isAadharValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Mother Occupation */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Mother Occupation*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="motherOccupation"
                  value={formData.parent.motherOccupation}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Annual Income */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Annual Income*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="annualIncome"
                  value={formData.parent.annualIncome}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Parent Address */}
              <div className="flex flex-col gap-3 w-full col-span-3">
                <label className="text-lg font-normal text-black">
                  Parent Address*
                </label>
                <textarea
                  type="text"
                  placeholder="Type here"
                  name="parentAddress"
                  value={formData.parent.parentAddress}
                  onChange={handleParentChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Local Guardian Details */}
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Local Guardian Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              {/* Guardian Name */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Guardian Name*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="guardianName"
                  value={formData.localGuardian.guardianName}
                  onChange={handleLocalGuardianChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Relation With Student */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Relation With Student*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="relationWithStudent"
                  value={formData.localGuardian.relationWithStudent}
                  onChange={handleLocalGuardianChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Contact Number*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="guardianContactNumber"
                  value={formData.localGuardian.guardianContactNumber}
                  onChange={handleLocalGuardianChange}
                  style={{
                    color: validation.isContactNumberValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Aadhar Number */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Aadhar Number*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="guardianAadharNumber"
                  value={formData.localGuardian.guardianAadharNumber}
                  onChange={handleLocalGuardianChange}
                  style={{
                    color: validation.isAadharValid ? 'initial' : 'red', // Change border color based on validity
                  }}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Occupation */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Occupation*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="guardianOccupation"
                  value={formData.localGuardian.guardianOccupation}
                  onChange={handleLocalGuardianChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-black">Address *</label>
            <textarea
              type="text"
              placeholder="Type here"
              name="guardianAddress"
              value={formData.localGuardian.guardianAddress}
              onChange={handleLocalGuardianChange}
              className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>

          <div className="flex gap-5 pb-10">
            <button
              type="submit"
              className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
            >
              Submit
            </button>
            <button type="button" className="w-44 text-black border border-gray-400 font-medium text-lg p-2">
              Cancel
            </button>
          </div>
          {isSelectOpen && (
            <Successcard onClose={closeModal} para={"Student added successfully!"} url={"/AdminDashboard/UserManagement"} />
          )}
        </form>
      </div>

    </>
  );
}
