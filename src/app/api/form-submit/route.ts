"use server"
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request:NextRequest) {
  const { userId, formId} = await request.json()


  if (!userId || !formId) {
    return NextResponse.json({ error: "All  field is required" }, { status: 400 })
  }
  try {

    const isuser =  await prisma.formSubmissions.findMany({
        where:{
            userId:userId,
            formId:formId
        }
    })

if(isuser){
    return NextResponse.json({ error: "This user already filled the form" }, { status: 400 })

}

    const form = await prisma.formSubmissions.create({
        data:{
userId:userId,
formId:formId
    } })
 



    return NextResponse.json({ message: "Form submitted successfully",user:form },
    {status:200})
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
