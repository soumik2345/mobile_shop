import Product from "@/utils/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}){

    const id = params.id


    const product = await Product.findOne({_id:id}).select('-__v');

    return NextResponse.json({product})
}