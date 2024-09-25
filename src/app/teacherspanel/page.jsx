import Dashboard from "./Dashboard/page";

export default function teacherspanel() {
  return (
    <>
      <Dashboard />
    </>
  );
}

{/*"use client"


import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Dashboard from "./Dashboard/page";

function TeachersPanel() {
  return (
    <>
      <Dashboard />
    </>
  );
}

// Protect the page so that only authenticated users can access it
export default withPageAuthRequired(TeachersPanel);

{/*export default function teacherspanel() {
  return (
    <>
      <div>treacherspNanel</div>
    </>
  );
}
  */}
