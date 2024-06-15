"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id, content } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }

  try {
    const isform = await prisma.form.findUnique({
      where: {
        id: id
      }
    });

    if (isform) {
      try {
        const form = await prisma.form.update({
          where: {
            id: id,
          },
          data: {
            content: content
          }
        });
        return NextResponse.json({ message: "Form updated successfully", user: form });
      } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
