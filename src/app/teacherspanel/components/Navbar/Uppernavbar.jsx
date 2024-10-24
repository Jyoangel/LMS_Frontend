'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import noti from './img/notification.png'; // Replace with the actual path

export default function UpperNavbar() {
  const { user, error, isLoading } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.picture);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log('User:', user);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);


  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the image to Cloudinary and get the URL
      const uploadedImageUrl = await uploadImageToCloud(file);
      console.log('Uploaded image URL:', uploadedImageUrl);
      if (uploadedImageUrl) {
        // Update the Auth0 profile picture
        try {
          await updateProfilePicture(user.sub, uploadedImageUrl);
          setProfilePicture(uploadedImageUrl);
          const updatedUser = await fetchUpdatedUserProfile(user.sub);
          console.log("updateuser", updatedUser);// Implement this function
          setProfilePicture(updatedUser.picture); // Update // Update state to reflect new profile picture
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      }
    }
  };

  return (
    <div className="relative h-20 w-full bg-white px-10 flex items-center justify-between shadow-lg">
      <h1 className="text-xl font-medium">Welcome {user ? user.nickname : 'name'}</h1>
      <div className="flex gap-5 items-center justify-center relative">
        <Image src={noti} alt="Notifications" />

        {/* Profile picture with upload functionality */}
        <div className="relative">
          {profilePicture && (
            <Image
              src={profilePicture}
              alt="Profile Photo"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()} // Open file dialog
            />
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the input
          />
        </div>

        <h1 className="text-xl font-medium">{user ? user.nickname : 'name'}</h1>
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

// Function to upload the image to Cloudinary and return the URL
// Function to upload the image to Cloudinary and return the URL
async function uploadImageToCloud(file) {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsnfr8q1u/image/upload'; // Ensure your cloud name is correct
  const CLOUDINARY_UPLOAD_PRESET = 'qcuvgncw'; // Ensure this preset exists in your Cloudinary settings

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload error:', errorData); // Log the error message from Cloudinary
      return null; // Return null if upload fails
    }

    const data = await response.json();
    return data.secure_url; // Get the secure URL for the uploaded image
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return null; // Return null if fetch fails
  }
}

console.log('Auth0 Domain:', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);


// Function to update the Auth0 profile picture
async function updateProfilePicture(userId, pictureUrl) {
  const token = await getManagementApiToken(); // Implement this function to get a token

  const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      picture: pictureUrl,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating profile picture:', errorData);
    return;
  }

  const data = await response.json();
  console.log('Profile picture updated successfully:', data);
  return data;
}

// Function to get the Management API access token
async function getManagementApiToken() {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function fetchUpdatedUserProfile(userId) {
  const token = await getManagementApiToken(); // Ensure you get a valid token

  const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching updated user profile:', errorData);
    return null; // Return null if fetch fails
  }

  const data = await response.json();
  return data; // Return the updated user data
}
