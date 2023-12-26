"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const AddProduct = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [category, setCategory] = useState([]);

  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [pcategory, setPcategory] = useState("");

  const addProduct = async () => {
    if (
      name === "" ||
      img === "" ||
      details === "" ||
      price === "" ||
      pcategory === ""
    ) {
      return toast.error("all filed are requerid");
    }

    if (price <= 0) {
      return toast.error("price not be 0 ar - numder");
    }

    const Pdata = {
      email: session.user.email,
      details,
      name,
      img,
      price,
      pcategory,
    };

    try {
      const res = await axios.post("/api/products/addProduct", Pdata);
      toast.success("Successfully");
      setDetails("");
      setName("");
      setImg("");
      setPrice("");
      setPcategory("");
      router.push("/admin/add_product");
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get("/api/category/categorys");
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="w-full sm:w-[90%] h-auto flex justify-center items-center mt-20">
        <div className="bg-gray-800 sm:w-[60%] w-[90%] p-5 rounded-none sm:rounded-md ">
          <h2 className="text-center text-lg font-bold mb-5">Add Product</h2>
          <div className="flex flex-col justify-center items-center text-white gap-3">
            <input
              type="text"
              className="w-[80%] h-12 rounded-lg border-none outline-none p-4"
              placeholder="Product name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <input
              type="text"
              className="w-[80%] h-12 rounded-lg border-none outline-none p-4"
              placeholder="Product img url"
              onChange={(e) => {
                setImg(e.target.value);
              }}
              value={img}
            />

            <div className="w-[80%] h-12 rounded-lg">
              <select
                id="category"
                name="category"
                className="w-[100%] h-12 rounded-lg border-none outline-none pl-4"
                onChange={(e) => {
                  setPcategory(e.target.value);
                }}
              >
                <option value="">Choose a category</option>
                {category.map((data, index) => (
                  <option key={index} value={data.categoryname}>
                    {data.categoryname}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="number"
              className="w-[80%] h-12 rounded-lg border-none outline-none p-4"
              placeholder="Product price (Tk)"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <div className="text-black">
              <h2 className="text-white">Product details</h2>
              <JoditEditor
                value={details}
                onChange={(newContent) => setDetails(newContent)}
                tabIndex={1}
              />
            </div>

            <button
              onClick={() => {
                addProduct();
              }}
              className="w-[80%] h-12 rounded-lg border-none outline-none bg-blue-500"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
