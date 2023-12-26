"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Singup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSingup = async () => {
    const regularExpression = /^[A-Za-z]\w{7,14}$/;

    try {
      setLoading(true);
      if (
        user.name === "" ||
        user.email === "" ||
        user.password === "" ||
        user.cpassword === ""
      ) {
        return toast.error("all field are required");
      }

      if (user.password !== user.cpassword) {
        return toast.error("password and confirm password don`t match");
      }

      if (user.password.length < 6) {
        return toast.error("password must be at least 6 characters");
      }

      if (!regularExpression.test(user.password)) {
        return toast.error(
          "password should contain atleast one number and one special character"
        );
      }
      let response = await axios.post("api/user/singup", user);
      toast.success("Successfully Signin");
      router.push("/singin");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        name: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[100%] md:w-[50%] sm:w-[30%] bg-gray-800 rounded-md text-white p-5 flex flex-col justify-center items-center">
        <h2 className="text-center font-semibold text-[1.5rem]">Sing In</h2>

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
            type="text"
            className="w-[100%] h-12 rounded-lg border-none outline-none p-4"
            placeholder="Name"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            value={user.name}
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
          <input
            type="password"
            className="w-[100%] h-12 rounded-lg border-none outline-none p-4"
            placeholder="Confirm Password"
            onChange={(e) => {
              setUser({ ...user, cpassword: e.target.value });
            }}
            value={user.cpassword}
          />
          <button
            onClick={() => {
              handleSingup();
            }}
            className="w-[100%] h-12 rounded-lg border-none outline-none bg-blue-500 text-white"
          >
            {loading ? "loading...." : "SingUp"}
          </button>

          <span className="text-white text-[14px] mb-5">
            Have a account?{" "}
            <Link href="/singin" className="text-blue-500">
              SingIn
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Singup;
