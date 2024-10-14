"use client"



import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./Navbar/Sidenavbar";
import Uppernavbar from "./Navbar/Uppernavbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isStudent, setIsStudent] = useState(null); // Track if the user is a student

  useEffect(() => {
    if (isLoading) return; // Wait until user is loaded

    if (!user) {
      router.push('/'); // Redirect to login if no user
      return;
    }

    const userRoles = user['https://chic-swan-0387d3.netlify.app/roles'];
    if (!userRoles || !userRoles.includes('Student')) {
      router.push('/'); // Redirect if not a student
      return;
    }

    setIsStudent(true); // Set student status to true if user is a student
  }, [user, isLoading, router]);

  if (isLoading || isStudent === null) return <div>Loading...</div>; // Show loading indicator while checking authentication

  if (error) return <div>Error: {error.message}</div>; // Handle any errors

  if (!isStudent) return null; // Prevent rendering until student check is complete

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




{/*import { Inter } from "next/font/google";
import "../globals.css";
import Sidenavbar from "./Navbar/Sidenavbar";
import Uppernavbar from "./Navbar/Uppernavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
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
}*/}
