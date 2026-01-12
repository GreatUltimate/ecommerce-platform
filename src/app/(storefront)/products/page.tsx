import { Metadata } from "next"
import { ProductCard } from "@/components/storefront/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

export const metadata: Metadata = {
    title: "Products",
    description: "Browse our collection of quality products.",
}

import { prisma } from "@/lib/prisma"

export default async function ProductsPage() {
    // Basic fetch of all products
    const products = await prisma.product.findMany({
        where: {
            published: true,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const categories = await prisma.category.findMany()

    return (
        <div className="container py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <p className="text-muted-foreground mt-1">
                    Browse our collection of quality products
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category: any) => (
                                <SelectItem key={category.id} value={category.slug || category.name.toLowerCase()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
                Showing {products.length} products
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination - placeholder */}
            <div className="mt-12 flex justify-center gap-2">
                <Button variant="outline" disabled>
                    Previous
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                    Next
                </Button>
            </div>
        </div>
    )
}
