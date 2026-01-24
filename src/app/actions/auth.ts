"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { sendWelcomeEmail } from "@/lib/email"
import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function userLogout() {
    await signOut({ redirectTo: "/" })
}

export async function login(formData: FormData) {
    try {
        await signIn("credentials", { ...Object.fromEntries(formData), redirectTo: "/account" })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid credentials.")
                default:
                    throw new Error("Something went wrong.")
            }
        }
        throw error
    }
}

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        throw new Error("Missing required fields")
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        // In a real app, you should return an error to display to the user
        // For now, we'll just redirect to login (or handle it gracefully)
        console.error("User already exists")
        redirect("/login")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    await sendWelcomeEmail(email, name)

    redirect("/login")
}
