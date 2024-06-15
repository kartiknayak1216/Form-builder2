"use server";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Ensure prisma is correctly imported

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const user = await currentUser();
console.log(id)
    if (!user || !id) {
        return NextResponse.json({ error: "User or ID not found" }, { status: 400 });
    }

    try {
        const data = await prisma.form.findUnique({
            where: {
                id: id,
                userId: user.id
            },
        });

        if (!data) {
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        return NextResponse.json({ user: data });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
