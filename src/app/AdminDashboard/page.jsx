"use client"


import Main from "./Main/Page";

export default function AdminDashboard() {
  return (
    <>
      <div>
        <Main />
      </div>
    </>
  );
}

{/*"use client"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Main from "./Main/Page";

function AdminDashboard() {
  return (
  
    <>
      <div>
        <Main />
      </div>
    </>
  );
}

// Ensure the page is only accessible to authenticated users
export default withPageAuthRequired(AdminDashboard);


// import Main from "./Main/Page";

// export default function AdminDashboard() {
//   return (
//     <>
//       <div>
//         <Main />
//       </div>
//     </>
//   );
// }
*/}
