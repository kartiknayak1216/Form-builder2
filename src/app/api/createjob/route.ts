"use server"
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request:NextRequest) {
  const { userId, title, description } = await request.json()


  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }
  try {
    const istitle =await prisma.form.findMany({
  where:{
    title:title,
    userId:userId
  }
 })
 
 if(istitle[0]){
  return NextResponse.json({ error: `Title ${istitle[0].title} already exist` }, { status: 400 })

 }


 const data = await prisma.form.create({
      data: {
        userId: userId,
        title: title,
        description: description,
        published: false
      }
    })

    return NextResponse.json({ message: "Form created successfully",user:data },
    {status:200})
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
