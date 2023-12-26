import Category from "@/utils/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(){

    const category = await Category.find().select("-__v -_id");

    return  NextResponse.json({category})
}