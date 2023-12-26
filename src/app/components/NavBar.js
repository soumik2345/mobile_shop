"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";

const NavBar = () => {
  const { data: session } = useSession();

  const [activeNav, setActiveNav] = useState(false);

  const troggleNav = () => {
    if (activeNav) {
      setActiveNav(false);
    } else {
      setActiveNav(true);
    }
  };

  return (
    <div className="sticky top-0 z-30">
    <div className="container mx-auto absolute">
      <nav className="bg-gray-800 h-16 px-4 flex justify-center">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <sapn className="text-white text-lg font-semibold">Logo</sapn>
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center space-x-4">
            <Link href="/">
              <span className="text-white">Home</span>
            </Link>
            <Link href="/product">
              <span className="text-white">Products</span>
            </Link>
            {session ? (
              <div className="dropdown dropdown-end text-white">
                <div tabIndex={0} >

                  { 
                  session.user.image ?
                  <img src={`${session.user.image}`} alt="logo" className="w-8 h-8 rounded-full cursor-pointer"/> :
                  <IoPersonCircle size={32}/>
                  }
  
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 text-white shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <a onClick={()=>{signOut('google')}}>SingOut</a>
                  </li>
                </ul>
              </div>
            ) : (

              <Link
                href="/singin"
                className="text-white bg-blue-500 px-5 py-3 rounded-md"
              >
                SingIn
              </Link>
            )}
          </div>
          <div className="md:hidden flex justify-center gap-2">

            
          <button className="text-white" onClick={() => troggleNav()}>
          <MdOutlineMenu size={24}/>
            </button>

          {session ? (
              <div className="dropdown dropdown-end text-white ">
                <div tabIndex={0} >

                  { 
                  session.user.image ?
                  <img src={`${session.user.image}`} alt="logo" className="w-6 h-6 rounded-full cursor-pointer"/> :
                  <IoPersonCircle size={24}/>
                  }
  
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 text-white shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <a onClick={()=>{signOut('google')}}>SingOut</a>
                  </li>
                </ul>
              </div>
            ) : (

              <Link
                href="/singin"
                className="text-white bg-blue-500 px-3 py-1 text-[12px] rounded-md"
              >
                SingIn
              </Link>
            )}
            
          </div>
        </div>
      </nav>
      <nav
        className={` md:hidden bg-gray-800 flex flex-col justify-center p-4 text-center h-[25vh] space-y-5  ${
          activeNav ? "" : "fixed top-[-200px] z-50"
        }`}
      >
        <Link href="/" onClick={() => troggleNav()}>
          <span className="text-white">Home</span>
        </Link>
        <Link href="/product" onClick={() => troggleNav()}>
          <span className="text-white">Products</span>
        </Link>
  
      </nav>
    </div>
    </div>
  );
};

export default NavBar;
