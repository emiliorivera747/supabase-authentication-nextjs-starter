
import React from 'react';

//actions
import { signOut } from '@/app/actions/actions';

export default function SignOutButton() {

  return (
    <form action={signOut}>
      <button className="signout-button p-2 px-4 border border-tertiary-900 text-tertiary-900  hover:bg-tertiary-400  transition duration-300 rounded-lg" type="submit">
        {/* {isLoading ? "Signing out..." : "Sign Out"} */}
        Sign Out
      </button>
    </form >
  );
}
