"use client";
import Loader from "@/app/components/Loader";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState({ name: "", img: "" });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const AddCategory = () => {
    setLoading(true);
    try {
   
      if (category.name === "" || category.img === "") {
        return toast.error("all field are required");
      }

      const data = {
        name: category.name,
        img: category.img,
        email: session.user.email,
      };

      const res = axios.post("/api/category/addCategory", data);
     
      toast.success("Successfully");
      router.push("/admin");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full sm:w-[90%] h-auto flex justify-center items-center mt-20">
          <div className="bg-gray-800 sm:w-[60%] w-[90%] p-5 rounded-none sm:rounded-md ">
            <h2 className="text-center text-lg font-bold mb-5">Add Category</h2>
            <div className="flex flex-col justify-center items-center text-white gap-3">
              <input
                type="text"
                className="w-[80%] h-12 rounded-lg border-none outline-none p-4"
                placeholder="Category name"
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value });
                }}
                value={category.name}
              />
              <input
                type="text"
                className="w-[80%] h-12 rounded-lg border-none outline-none p-4"
                placeholder="Category image url"
                onChange={(e) => {
                  setCategory({ ...category, img: e.target.value });
                }}
                value={category.img}
              />
              <button
                onClick={() => {
                  AddCategory();
                }}
                className="w-[80%] h-12 rounded-lg border-none outline-none bg-blue-500"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
