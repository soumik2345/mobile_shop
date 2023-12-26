import { connect } from "@/utils/config/dbConfig";
import Category from "@/utils/models/categoryModel";
import User from "@/utils/models/userModel";
import { NextResponse } from "next/server";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export async function POST(request) {
  await connect();

  const reqBody = await request.json();
  const { name, img, email } = reqBody;
  const cname = await capitalize(name);

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse({ mess: "no user foun" });
  }

  if (!user.isAdmin) {
    return NextResponse({ mess: "you are not a admin" });
  }

  const newCategory = new Category({
    categoryname: name,
    image: img,
  });

  const res = await newCategory.save();

  return NextResponse.json({
    message: "created successfully",
    success: true,
  });
}
