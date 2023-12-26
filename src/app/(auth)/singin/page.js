"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Singin = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSingIn = async () => {
    try {
      setLoading(true);

      if (user.email === "" || user.password === "") {
        return toast.error("all field are required");
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });


      if (res.error) {
        return toast.error("worng credentials");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[100%] md:w-[50%] sm:w-[30%] bg-gray-800 rounded-md text-white p-5 flex flex-col justify-center items-center">
        <h2 className="text-center font-semibold text-[1.5rem]">Sing In</h2>
        <Link href={"/"}>Go Back Home</Link>
        <div className="w-[80%] mt-5 space-y-5 text-white">
          <input
            type="text"
            className="w-[100%] h-12 rounded-lg border-none outline-none p-4"
            placeholder="Email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            value={user.email}
          />
          <input
            type="password"
            className="w-[100%] h-12 rounded-lg border-none outline-none p-4"
            placeholder="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            value={user.password}
          />
          <button
            onClick={() => {
              handleSingIn();
            }}
            className="w-[100%] h-12 rounded-lg border-none outline-none bg-blue-500 text-white"
          >
            SingIn
          </button>

          <span className="flex justify-between ">
            <span className="text-white text-[14px]">
              Not a member?{" "}
              <Link href="/singup" className="text-blue-500">
                SingUp
              </Link>
            </span>
            <a href="/" className="text-blue-500 text-[14px]">
              forget password
            </a>
          </span>
        </div>

        <span className="text-gray-400 mt-5"> ——— OR SingIn With ———</span>

        <button
        onClick={()=>{
          signIn("google")
        }}
         className="w-[80%] mt-5 mb-5 h-12 rounded-lg border-none outline-none bg-blue-500 text-white flex justify-center items-center">
          <FcGoogle size={28} />
          Singin With Google
        </button>
      </div>
    </div>
  );
};

export default Singin;
