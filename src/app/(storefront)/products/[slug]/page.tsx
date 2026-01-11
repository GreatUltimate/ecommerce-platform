import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Truck, Shield, ArrowLeft, Minus, Plus } from "lucide-react"

// Mock product data - will come from database
const products: Record<string, {
    id: string
    name: string
    slug: string
    description: string
    price: number
    compareAtPrice: number | null
    inventory: number
    images: string[]
    category: { name: string; slug: string }
    variants: { name: string; values: string[] }[]
}> = {
    "premium-wireless-headphones": {
        id: "1",
        name: "Premium Wireless Headphones",
        slug: "premium-wireless-headphones",
        description: "Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, 40-hour battery life, and ultra-comfortable memory foam ear cushions. Perfect for music lovers, gamers, and remote workers alike.\n\n• Active Noise Cancellation\n• 40-hour battery life\n• Bluetooth 5.2 connectivity\n• Memory foam ear cushions\n• Foldable design for easy travel",
        price: 199.99,
        compareAtPrice: 249.99,
        inventory: 50,
        images: ["/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg"],
        category: { name: "Electronics", slug: "electronics" },
        variants: [
            { name: "Color", values: ["Black", "White", "Silver"] },
        ],
    },
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const product = products[slug]

    if (!product) {
        return { title: "Product Not Found" }
    }

    return {
        title: product.name,
        description: product.description.substring(0, 160),
    }
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params
    const product = products[slug]

    if (!product) {
        notFound()
    }

    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
    const discountPercentage = hasDiscount
        ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
        : 0

    return (
        <div className="container py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-primary">Products</Link>
                <span>/</span>
                <Link href={`/categories/${product.category.slug}`} className="hover:text-primary">
                    {product.category.name}
                </Link>
                <span>/</span>
                <span className="text-foreground">{product.name}</span>
            </nav>

            {/* Back button (mobile) */}
            <Link href="/products" className="md:hidden inline-flex items-center text-sm mb-4 hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No image
                            </div>
                        )}
                        {hasDiscount && (
                            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                                -{discountPercentage}% OFF
                            </Badge>
                        )}
                    </div>
                    {/* Thumbnail gallery */}
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, i) => (
                            <button
                                key={i}
                                className="relative aspect-square rounded-md overflow-hidden bg-muted border-2 border-transparent hover:border-primary transition-colors"
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-4">
                        <Link
                            href={`/categories/${product.category.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary"
                        >
                            {product.category.name}
                        </Link>
                    </div>

                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <>
                                <span className="text-xl text-muted-foreground line-through">
                                    ${product.compareAtPrice!.toFixed(2)}
                                </span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    Save ${(product.compareAtPrice! - product.price).toFixed(2)}
                                </Badge>
                            </>
                        )}
                    </div>

                    {/* Stock status */}
                    <div className="mt-4">
                        {product.inventory > 0 ? (
                            <span className="text-sm text-green-600 font-medium">
                                ✓ In Stock ({product.inventory} available)
                            </span>
                        ) : (
                            <span className="text-sm text-red-600 font-medium">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <Separator className="my-6" />

                    {/* Variants */}
                    {product.variants.map((variant) => (
                        <div key={variant.name} className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                {variant.name}
                            </label>
                            <Select defaultValue={variant.values[0]}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {variant.values.map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}

                    {/* Quantity */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Quantity</label>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">1</span>
                            <Button variant="outline" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="flex-1">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck className="h-5 w-5" />
                            <span>Free shipping over $50</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Shield className="h-5 w-5" />
                            <span>30-day returns</span>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Description */}
                    <div>
                        <h2 className="font-semibold mb-4">Description</h2>
                        <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
