import Product from "@/utils/models/productModel";
import { NextResponse } from "next/server";

export async function GET(){

    const products = await Product.find().select('-__v -details').sort({ _id: -1 });

    return NextResponse.json({products})
}