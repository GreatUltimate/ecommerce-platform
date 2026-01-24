import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Categories | Store",
    description: "Browse our product categories.",
}

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { products: true }
            }
        }
    })

    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Browse Categories</h1>
                <p className="text-muted-foreground mt-2">
                    Explore our wide range of products by category.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.slug}`}>
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {category._count.products} {category._count.products === 1 ? 'Product' : 'Products'}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No categories found.
                    </div>
                )}
            </div>
        </div>
    )
}
