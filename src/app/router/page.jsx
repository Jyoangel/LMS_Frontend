import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
//import { Users } from "@kinde/management-api-js";
import React from 'react'

export default async function page() {
    const { getUser } = getKindeServerSession();
    //const { users } = await Users.getUsers();
    const user = await getUser();
    console.log(user);
    //console.log(users);

    return (
        <div>page </div>
    )
}


