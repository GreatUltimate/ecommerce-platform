"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { useState } from "react"

interface ProductCardProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        compareAtPrice?: number | null
        images: string[]
        category?: {
            name: string
        } | null
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const [isAdding, setIsAdding] = useState(false)

    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
    const discountPercentage = hasDiscount
        ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
        : 0

    const handleAddToCart = () => {
        setIsAdding(true)
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0] || "/placeholder-product.jpg",
            quantity: 1,
        })
        toast.success(`${product.name} added to cart!`, {
            description: "Click the cart icon to view your items.",
        })
        setTimeout(() => setIsAdding(false), 1000)
    }

    return (
        <Card className="group overflow-hidden">
            <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No image
                        </div>
                    )}
                    {hasDiscount && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                            -{discountPercentage}%
                        </Badge>
                    )}
                </div>
            </Link>
            <CardContent className="p-4">
                {product.category && (
                    <p className="text-xs text-muted-foreground mb-1">
                        {product.category.name}
                    </p>
                )}
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-lg">
                        ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                            ${product.compareAtPrice!.toFixed(2)}
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full"
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? (
                        <>
                            <Check className="h-4 w-4 mr-2" />
                            Added!
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}

