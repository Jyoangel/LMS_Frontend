"use client"


import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./Navbar/sidenavbar";
import Uppernavbar from "./Navbar/uppernavbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null);



  // Function to add admin user data to the database
  // Function to add or update admin user data in the database
  const addOrUpdateAdminUser = async (adminData) => {
    try {
      // Check if the admin user already exists
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`, {
        method: "GET",
      });

      if (response.ok) {
        // If user exists, update the user data
        const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update admin user");
        }
      } else {
        // If user does not exist, add a new user
        const addResponse = await fetch("${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        });

        if (!addResponse.ok) {
          throw new Error("Failed to add admin user");
        }
      }
    } catch (error) {
      console.error("Error adding or updating admin user:", error);
    }
  };


  // Check user role and redirect if necessary
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/'); // Redirect to homepage if no user
      return;
    }

    const userRoles = user['https://chic-swan-0387d3.netlify.app//roles'];
    if (!userRoles || !userRoles.includes('Admin')) {
      router.push('/'); // Redirect if not admin
      return;
    }

    // Set admin status and add admin data to the database if not already done
    setIsAdmin(true);

    // Create admin user data object
    const adminData = {
      userId: user.sub,
      name: user.name,
      email: user.email,
      roles: userRoles,
      picture: user.picture,
    };

    addOrUpdateAdminUser(adminData);
  }, [user, isLoading, router]);

  if (isLoading || isAdmin === null) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!isAdmin) return null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full">
          <Sidenavbar />
          <div className="flex flex-col w-full">
            <Uppernavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

{/*
import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./Navbar/sidenavbar";
import Uppernavbar from "./Navbar/uppernavbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null); // Track if the user is an admin

  // Check user role and redirect if necessary
  useEffect(() => {
    if (isLoading) return; // Wait until user is loaded

    if (!user) {
      router.push('/'); // Redirect to homepage if no user
      return;
    }

    const userRoles = user['https://localhost:3000/roles'];
    if (!userRoles || !userRoles.includes('Admin')) {
      router.push('/'); // Redirect if not admin
      return;
    }

    setIsAdmin(true); // Set admin status to true if user is an admin
  }, [user, isLoading, router]);

  if (isLoading || isAdmin === null) return <div>Loading...</div>; // Show loading indicator while checking authentication

  if (error) return <div>Error: {error.message}</div>; // Handle any errors

  if (!isAdmin) return null; // Prevent rendering until admin check is complete

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full">
          <Sidenavbar />
          <div className="flex flex-col w-full">
            <Uppernavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

{/*
import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./Navbar/sidenavbar";
import Uppernavbar from "./Navbar/uppernavbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || !user['https://localhost:3000/roles'].includes('Admin')) {
      router.push("/"); // Redirect to Auth0 login page if not authenticated
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>; // Show loading indicator while checking authentication

  if (error) return <div>Error: {error.message}</div>; // Handle any errors

  if (!user) return null; // Prevent rendering until the redirect is complete
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full  ">
          <Sidenavbar />
          <div className="flex flex-col w-full">
            <Uppernavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
*/}
