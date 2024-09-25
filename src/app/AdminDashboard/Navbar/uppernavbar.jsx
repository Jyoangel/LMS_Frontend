'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import noti from './img/notification.png'; // Replace with the actual path

export default function UpperNavbar() {
  const { user, error, isLoading } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);


  };

  console.log(user);

  return (
    <div className="relative h-20 w-full bg-white px-10 flex items-center justify-between shadow-lg">
      <h1 className="text-xl font-medium">Welcome {user ? user.name : 'name'}</h1>
      <div className="flex gap-5 items-center justify-center relative">
        <Image src={noti} alt="Notifications" />
        {user && user.picture && (
          <div
            src={user.picture}
            alt="Profile Photo"
            width={40}
            height={40}
            className=""
          />
        )}
        <h1 className="text-xl font-medium">{user ? user.name : 'name'}</h1>
        <IoIosArrowDown size={25} onClick={toggleDropdown} className="cursor-pointer" data-testid="dropdown-icon" />
        {dropdownVisible && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
            onMouseLeave={hideDropdown}
          >
            <a href="/api/auth/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


{/*
import Image from "next/image";
import noti from "./img/notification.png";
import person1 from "./img/person1.png";
import { IoIosArrowDown } from "react-icons/io";

import { useUser } from '@auth0/nextjs-auth0/client';





export default function uppernavbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <div className="h-20 w-full bg-white px-10 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-medium">Welcome name</h1>
        <div className="flex gap-5 items-center justify-center">
          <Image src={noti} />
          {/* Profile photo *
          <Image src={person1} />
          <h1 className="text-xl font-medium">name</h1>
          <IoIosArrowDown size={25} />
        </div>
        <a href="/api/auth/logout">Logout</a>
      </div>
    </>
  );
}
  */}
