import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/storefront/product-card"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const category = await prisma.category.findUnique({ where: { slug } })

    if (!category) return { title: 'Category Not Found' }

    return {
        title: `${category.name} | Store`,
        description: `Shop ${category.name} products.`,
    }
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                include: { category: true }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
                <p className="text-muted-foreground mt-2">
                    {category.products.length} {category.products.length === 1 ? 'Result' : 'Results'}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={{
                            ...product,
                            price: Number(product.price),
                            compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null
                        }}
                    />
                ))}

                {category.products.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    )
}
