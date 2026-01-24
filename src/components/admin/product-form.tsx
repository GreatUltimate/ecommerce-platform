"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Upload, X, Save, Trash2 } from "lucide-react"

const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
    { id: "home", name: "Home" },
]

type ProductFormProps = {
    action: (formData: FormData) => Promise<void>
    initialData?: {
        name: string
        description: string | null
        price: number
        compareAtPrice: number | null
        inventory: number
        images: string[]
        categoryId: string | null
        published: boolean
        sku?: string | null
    }
    isEditing?: boolean
}

export function ProductForm({ action, initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter()
    const [images, setImages] = useState<string[]>(initialData?.images || [])

    return (
        <form action={action} className="space-y-6">
            <input type="hidden" name="images" value={JSON.stringify(images)} />

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isEditing ? "Edit Product" : "New Product"}
                    </h2>
                    <p className="text-muted-foreground">
                        {isEditing ? "Update product details" : "Add a new product to your store"}
                    </p>
                </div>
                {isEditing && (
                    <Button type="button" variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Product name"
                                    defaultValue={initialData?.name}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Write a description for your product..."
                                    defaultValue={initialData?.description || ""}
                                    rows={6}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground mb-2">
                                    Drag and drop images here, or click to browse
                                </p>
                                <Button type="button" variant="secondary" size="sm" onClick={() => {
                                    // Mock image upload for now
                                    const url = window.prompt("Enter image URL")
                                    if (url) setImages([...images, url])
                                }}>
                                    Upload Images
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">
                                    (For now, click to paste an image URL)
                                </p>
                            </div>
                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                                            <img src={image} alt="" className="object-cover w-full h-full" />
                                            <button
                                                type="button"
                                                onClick={() => setImages(images.filter((_, i) => i !== index))}
                                                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            className="pl-7"
                                            defaultValue={initialData?.price}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="compareAtPrice">Compare at price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            id="compareAtPrice"
                                            name="compareAtPrice"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            className="pl-7"
                                            defaultValue={initialData?.compareAtPrice || ""}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Original price to show a discount
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="inventory">Stock quantity *</Label>
                                    <Input
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        min="0"
                                        defaultValue={initialData?.inventory ?? 0}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        placeholder="Stock keeping unit"
                                        defaultValue={initialData?.sku || ""}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select name="published" defaultValue={String(initialData?.published ?? false)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Published</SelectItem>
                                    <SelectItem value="false">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select name="category" defaultValue={initialData?.categoryId || ""}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button type="submit" className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            {isEditing ? "Save Changes" : "Save Product"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
