"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

function slugify(text: string) {
    return text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

// ==============================
// Store Settings
// ==============================

export async function updateSettings(formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const storeName = formData.get("storeName") as string
    const description = formData.get("description") as string
    const currency = formData.get("currency") as string
    const contactEmail = formData.get("contactEmail") as string

    if (!storeName) throw new Error("Store Name is required")

    await prisma.storeSettings.upsert({
        where: { id: "settings" },
        update: { storeName, description, currency, contactEmail },
        create: { id: "settings", storeName, description, currency, contactEmail }
    })

    revalidatePath("/admin/settings")
    revalidatePath("/")
}

// ==============================
// Pages (CMS)
// ==============================

export async function createPage(formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "true"

    if (!title) throw new Error("Title is required")

    const slug = slugify(title)

    // Ensure unique slug
    let uniqueSlug = slug
    let count = 1
    while (await prisma.page.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`
        count++
    }

    await prisma.page.create({
        data: { title, slug: uniqueSlug, content, published }
    })

    revalidatePath("/admin/pages")
    redirect("/admin/pages")
}

export async function updatePage(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "true"

    if (!title) throw new Error("Title is required")

    // Note: We are not updating the slug here to preserve links, unless we add explicit slug editing later.

    await prisma.page.update({
        where: { id },
        data: { title, content, published }
    })

    revalidatePath("/admin/pages")
    revalidatePath(`/pages/${id}`) // This won't work well with slug based revalidation, better to use slug path.
    // Ideally we revalidate the slug path:
    const page = await prisma.page.findUnique({ where: { id }, select: { slug: true } })
    if (page) revalidatePath(`/(storefront)/pages/${page.slug}`, "page")

    redirect("/admin/pages")
}

export async function deletePage(id: string) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await prisma.page.delete({ where: { id } })
    revalidatePath("/admin/pages")
}
