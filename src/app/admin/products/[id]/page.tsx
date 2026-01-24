
import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { ProductForm } from "@/components/admin/product-form"
import { updateProduct } from "@/app/actions/products"

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/login")
    }

    const { id } = await params
    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })

    if (!product) {
        notFound()
    }

    // Convert Decimals to numbers for the form
    const initialData = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
        inventory: product.inventory,
        images: product.images,
        categoryId: product.categoryId,
        published: product.published,
        sku: null // Add field if exists in schema, otherwise null
    }

    const updateAction = updateProduct.bind(null, product.id)

    return (
        <ProductForm
            action={updateAction}
            initialData={initialData}
            isEditing
        />
    )
}
