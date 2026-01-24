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

export async function createProduct(formData: FormData) {
    const session = await auth()

    // Authorization check
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const compareAtPrice = formData.get("compareAtPrice") ? parseFloat(formData.get("compareAtPrice") as string) : null
    const inventory = parseInt(formData.get("inventory") as string)
    const categoryName = formData.get("category") as string
    const published = formData.get("published") === "true"

    // Handle images - in a real app these would be uploaded separately and URLs passed here
    // For now we'll accept a comma-separated list of URLs from a hidden field if present, 
    // or just use placeholders.
    const imagesString = formData.get("images") as string
    const images = imagesString ? JSON.parse(imagesString) : []

    if (!name || !price || isNaN(price)) {
        throw new Error("Missing required fields")
    }

    const slug = slugify(name)

    // Ensure unique slug
    let uniqueSlug = slug
    let count = 1
    while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`
        count++
    }

    try {
        // Handle Category association (Upsert style logic or find existing)
        // For simplicity, if we pass an ID, we connect. If it's a new name, we might create.
        // The current UI sends IDs like "electronics", "clothing". 
        // We'll treat these as slugs/names for now and find/create the category.

        let categoryId: string | undefined

        if (categoryName) {
            const category = await prisma.category.upsert({
                where: { slug: categoryName },
                update: {},
                create: {
                    name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                    slug: categoryName
                }
            })
            categoryId = category.id
        }

        await prisma.product.create({
            data: {
                name,
                slug: uniqueSlug,
                description,
                price,
                compareAtPrice,
                inventory,
                published,
                images,
                categoryId
            }
        })

        revalidatePath("/admin/products")
        revalidatePath("/") // Revalidate storefront too

    } catch (error) {
        console.error("Failed to create product:", error)
        throw new Error("Failed to create product")
    }

    redirect("/admin/products")
}


export async function updateProduct(id: string, formData: FormData) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const compareAtPrice = formData.get("compareAtPrice") ? parseFloat(formData.get("compareAtPrice") as string) : null
    const inventory = parseInt(formData.get("inventory") as string)
    const categoryName = formData.get("category") as string
    const published = formData.get("published") === "true"

    const imagesString = formData.get("images") as string
    const images = imagesString ? JSON.parse(imagesString) : []

    if (!name || !price || isNaN(price)) {
        throw new Error("Missing required fields")
    }

    try {
        let categoryId: string | undefined

        // If category changed or wasn't set, resolve it
        if (categoryName) {
            // Find or create category
            const category = await prisma.category.upsert({
                where: { slug: categoryName },
                update: {},
                create: {
                    name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                    slug: categoryName
                }
            })
            categoryId = category.id
        }

        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                compareAtPrice,
                inventory,
                published,
                images,
                categoryId // Will update if defined
            }
        })

        revalidatePath("/admin/products")
        revalidatePath("/")
        revalidatePath(`/products/[slug]`)

    } catch (error) {
        console.error("Failed to update product:", error)
        throw new Error("Failed to update product")
    }

    redirect("/admin/products")
}
