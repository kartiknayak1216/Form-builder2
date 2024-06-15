"use server"

import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Make sure prisma is correctly imported

export async function GET() {
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    try {
        const data = await prisma.form.findMany({
            where: {
                userId: user.id,
            },
        })

        return NextResponse.json({ user: data })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
