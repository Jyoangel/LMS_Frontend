"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./components/Navbar/Sidenavbar";
import Uppernavbar from "./components/Navbar/Uppernavbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isTeacher, setIsTeacher] = useState(null); // Track if the user is a teacher

  useEffect(() => {
    if (isLoading) return; // Wait until user is loaded

    if (!user) {
      router.push('/'); // Redirect to homepage if no user
      return;
    }

    const userRoles = user[`${process.env.AUTH0_BASE_URL}/roles`];
    if (!userRoles || !userRoles.includes('Teacher')) {
      router.push('/'); // Redirect if not a teacher
      return;
    }

    setIsTeacher(true); // Set teacher status to true if user is a teacher
  }, [user, isLoading, router]);

  if (isLoading || isTeacher === null) return <div>Loading...</div>; // Show loading indicator while checking authentication

  if (error) return <div>Error: {error.message}</div>; // Handle any errors

  if (!isTeacher) return null; // Prevent rendering until teacher check is complete

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
