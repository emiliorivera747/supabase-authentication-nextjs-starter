'use client'

import React from "react";
import Link from "next/link";

const SignInButton = () => {
    return (
        <div>
            <Link className=" transition duration-300 px-[.94118rem] py-[0.6rem] rounded-lg  bg-tertiary-200 text-sm hover:bg-tertiary-400 text-tertiary-900 font-medium cursor-pointer " href="/sign-in">Sign In</Link>
        </div>
    )
}

export default SignInButton