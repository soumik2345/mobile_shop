"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Drawer from "@/app/components/Drawer";

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  return (
    <div className="grid grid-rows-8 sm:grid-cols-8">
      <div className="self-start sticky top-0 grid-rows-2 sm:col-span-2">
        {session ? <Drawer data={session.user} /> : ""}
      </div>

      <div className="col-span-6">{children}</div>
    </div>
  );
}
