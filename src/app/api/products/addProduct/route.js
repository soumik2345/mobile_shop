import Product from "@/utils/models/productModel";
import User from "@/utils/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();

  const { email, details, name, img, price, pcategory } = reqBody;

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse({ mess: "no user foun" });
  }

  if (!user.isAdmin) {
    return NextResponse({ mess: "you are not a admin" });
  }

  const username = await user.username;


  const newProduct = await new Product({
    name,
    image: img,
    price,
    category: pcategory,
    details,
    addby: username,
  });



    const res = await newProduct.save();

  return NextResponse.json({
    message: "created successfully",
    success: true,
  });
}
