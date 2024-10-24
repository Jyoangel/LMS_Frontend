"use client"



// import { Inter } from "next/font/google";
// import "../globals.css";
// import Sidenavbar from "./Navbar/sidenavbar";
// import Uppernavbar from "./Navbar/uppernavbar";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const { user, error, isLoading } = useUser();
//   const router = useRouter();
//   const [isAdmin, setIsAdmin] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state for refresh

//   // useEffect(() => {
//   //   const initializeAdminUser = async () => {
//   //     if (user) {
//   //       // Create database
//   //       try {
//   //         const feeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admin/create-database`, {
//   //           method: "POST",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           body: JSON.stringify({
//   //             dbName: user.sub, // Extract the user ID as the dbName
//   //           }),
//   //         });

//   //         if (!feeResponse.ok) {
//   //           throw new Error('Failed to create database');
//   //         }

//   //         const data = await feeResponse.json();
//   //         console.log('Database created successfully:', data);

//   //         // Now proceed to add or update admin user
//   //         const adminData = {
//   //           userId: user.sub,
//   //           name: user.name,
//   //           email: user.email,
//   //           roles: user['https://localhost:3000/roles'], // Ensure roles are retrieved
//   //           picture: user.picture,
//   //         };

//   //         await addOrUpdateAdminUser(adminData);

//   //       } catch (error) {
//   //         console.error("Error during admin initialization:", error);
//   //       }
//   //     }
//   //   };

//   //   initializeAdminUser();
//   // }, [user]);

//   // Function to add or update admin user data in the database
//   const addOrUpdateAdminUser = async (adminData) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.ok) {
//         const updateResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(adminData),
//           }
//         );

//         if (!updateResponse.ok) {
//           throw new Error("Failed to update admin user");
//         }
//       } else {
//         const addResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(adminData),
//           }
//         );

//         if (!addResponse.ok) {
//           throw new Error("Failed to add admin user");
//         }
//       }
//     } catch (error) {
//       console.error("Error adding or updating admin user:", error);
//     }
//   };

//   // Check user role and redirect if necessary
//   useEffect(() => {
//     if (isLoading) return;

//     if (!user) {
//       router.push("/"); // Redirect to homepage if no user
//       return;
//     }

//     const userRoles = user['https://localhost:3000/roles'];
//     if (!userRoles || !userRoles.includes('Admin')) {
//       router.push('/'); // Redirect if not admin
//       return;
//     }

//     // Set admin status
//     setIsAdmin(true);
//   }, [user, isLoading, router]);

//   useEffect(() => {
//     // Refresh logic after successful login
//     const hasRefreshed = sessionStorage.getItem("hasRefreshed");

//     if (isAdmin && !hasRefreshed) {
//       sessionStorage.setItem("hasRefreshed", "true"); // Set refresh flag in session storage
//       router.replace({
//         pathname: router.pathname,
//         query: { refreshed: "true" },
//       });
//       window.location.reload(); // Reload the page
//     } else {
//       setLoading(false); // Stop loading once refresh logic is done
//     }
//   }, [isAdmin, router]);

//   if (isLoading || loading) return <div>Loading...</div>; // Show loading message

//   if (error) return <div>Error: {error.message}</div>;

//   if (!isAdmin) return null;

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex w-full">
//           <Sidenavbar />
//           <div className="flex flex-col w-full">
//             <Uppernavbar />
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }


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
  const [loading, setLoading] = useState(true); // Loading state for refresh
  // useEffect(() => {
  //   if (user) {
  //     const fetchDetails = async () => {
  //       try {
  //         const feeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admin/create-database`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             dbName: user.sub,  // Extract the email prefix as the dbName
  //           }),
  //         });

  //         // Check if the response was successful
  //         if (!feeResponse.ok) {
  //           throw new Error('Failed to create database');
  //         }

  //         const data = await feeResponse.json();
  //         console.log('Database created successfully:', data);

  //       } catch (error) {
  //         console.error("Error creating database:", error);
  //       }
  //     };
  //     fetchDetails();
  //   }
  // }, [user]);
  // Function to add or update admin user data in the database
  const addOrUpdateAdminUser = async (adminData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const updateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update admin user");
        }
      } else {
        const addResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData),
          }
        );

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
      router.push("/"); // Redirect to homepage if no user
      return;
    }

    const userRoles = user['https://coruscating-sunshine-25faaf.netlify.app/roles'];
    if (!userRoles || !userRoles.includes('Admin')) {
      router.push('/'); // Redirect if not admin
      return;
    }

    // Set admin status and add admin data to the database if not already done
    setIsAdmin(true);

    const adminData = {
      userId: user.sub,
      name: user.name,
      email: user.email,
      roles: userRoles,
      picture: user.picture,
    };

    addOrUpdateAdminUser(adminData);
  }, [user, isLoading, router]);

  useEffect(() => {
    // Refresh logic after successful login
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (isAdmin && !hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true"); // Set refresh flag in session storage
      router.replace({
        pathname: router.pathname,
        query: { refreshed: "true" },
      });
      window.location.reload(); // Reload the page
    } else {
      setLoading(false); // Stop loading once refresh logic is done
    }
  }, [isAdmin, router]);

  if (isLoading || loading) return <div>Loading...</div>; // Show loading message

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



// import { Inter } from "next/font/google";
// import "../globals.css";
// import Sidenavbar from "./Navbar/sidenavbar";
// import Uppernavbar from "./Navbar/uppernavbar";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const { user, error, isLoading } = useUser();
//   const router = useRouter();
//   const [isAdmin, setIsAdmin] = useState(null);

//   // Function to add admin user data to the database
//   // Function to add or update admin user data in the database
//   const addOrUpdateAdminUser = async (adminData) => {
//     try {
//       // Check if the admin user already exists
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`, {
//         method: "GET",
//       });

//       if (response.ok) {
//         // If user exists, update the user data
//         const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser/${adminData.userId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(adminData),
//         });

//         if (!updateResponse.ok) {
//           throw new Error("Failed to update admin user");
//         }
//       } else {
//         // If user does not exist, add a new user
//         const addResponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/adminUser`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(adminData),
//         });

//         if (!addResponse.ok) {
//           throw new Error("Failed to add admin user");
//         }
//       }
//     } catch (error) {
//       console.error("Error adding or updating admin user:", error);
//     }
//   };


//   // Check user role and redirect if necessary
//   useEffect(() => {
//     if (isLoading) return;

//     if (!user) {
//       router.push('/'); // Redirect to homepage if no user
//       return;
//     }

//     const userRoles = user['https://localhost:3000/roles'];
//     if (!userRoles || !userRoles.includes('Admin')) {
//       router.push('/'); // Redirect if not admin
//       return;
//     }

//     // Set admin status and add admin data to the database if not already done
//     setIsAdmin(true);

//     // Create admin user data object
//     const adminData = {
//       userId: user.sub,
//       name: user.name,
//       email: user.email,
//       roles: userRoles,
//       picture: user.picture,
//     };

//     addOrUpdateAdminUser(adminData);
//   }, [user, isLoading, router]);

//   if (isLoading || isAdmin === null) return <div>Loading...</div>;

//   if (error) return <div>Error: {error.message}</div>;

//   if (!isAdmin) return null;

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex w-full">
//           <Sidenavbar />
//           <div className="flex flex-col w-full">
//             <Uppernavbar />
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

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

    const userRoles = user['https://coruscating-sunshine-25faaf.netlify.app/roles'];
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
