import Link from "next/link";
import React from "react";
import { IoPersonCircle } from "react-icons/io5";

const Drawer = (props) => {
  const { name, email, image } = props.data;
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content fixed right-0 flex flex-col items-end justify-end m-4">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-blue-500 text-white lg:hidden"
          >
            menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-[94vh] sm:min-h-fill bg-base-200 text-base-content mt-auto">
            <div className="mt-5 mb-3 flex flex-col justify-center items-center bg-gray-800 rounded-md p-5 gap-4">
              {image ? (
                <img
                  src={`${image}`}
                  alt="logo"
                  className="w-20 h-20 rounded-full cursor-pointer"
                />
              ) : (
                <IoPersonCircle size={80} />
              )}
              <div className="">
                <h2>Admin: {name}</h2>
                <h2>Email: {email}</h2>
              </div>
            </div>

            <li>
              <Link href={'/admin'}>Home</Link>
            </li>
            <li>
              <Link href={'/admin/add_product'}>Add Product</Link>
            </li>
            <li>
              <Link href={'/admin/add_category'}>Add Category</Link>
            </li>
            <li>
              <Link href={'/admin/products'}>Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
