"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { IoPersonCircle } from "react-icons/io5";

const Profile = () => {
  const { data: session, status } = useSession();

  // loading

  return (
    <>
      {session ? (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <div className="bg-gray-800 w-[100%] sm:w-[30%] rounded-none sm:rounded-lg">
                <h1 className="text-center pt-3 text-[24px]"><u>Profile</u></h1>
          <div className=" p-5 flex justify-center items-center flex-col sm:flex-row gap-3">
            <div className="">
                {session.user.image ? <img src={`${session.user.image }`} alt="img" className="w-36 h-36 rounded-full" /> : <IoPersonCircle size={144}/>}
            </div>
            <div className="">
            <p>Email: {session.user.email}</p>
            <p>Name: {session.user.name}</p>
            {session.user.isAdmin ? <p>You are admin. <Link href={"/admin"} className="text-blue-500">Go to admin page</Link></p> : ''}
            </div>
          </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Profile;
