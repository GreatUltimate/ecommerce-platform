"use client"

import { ProductForm } from "@/components/admin/product-form"
import { createProduct } from "@/app/actions/products"

export default function NewProductPage() {
    return (
        <ProductForm action={createProduct} />
    )
}
