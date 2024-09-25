import Dashboard from "./Dashboard/page";

export default function StudentPanel() {
  return (
    <>
      <Dashboard />
    </>
  );
}

{/*'use client'; // Mark this as a client-side component

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Dashboard from "./Dashboard/page";

function StudentPanel() {
  return (
    <>
      <Dashboard />
    </>
  );
}

// Protect the page so that only authenticated users can access it
export default withPageAuthRequired(StudentPanel);
*/}

