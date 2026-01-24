"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ShoppingCart, Heart, Minus, Plus, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface ProductActionsProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        inventory: number
        images: string[]
        variants: { name: string; values: string[] }[]
    }
}

export function ProductActions({ product }: ProductActionsProps) {
    const { addItem } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        product.variants.forEach((v) => {
            initial[v.name] = v.values[0]
        })
        return initial
    })
    const [isAdding, setIsAdding] = useState(false)

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1 && newQuantity <= product.inventory) {
            setQuantity(newQuantity)
        }
    }

    const handleAddToCart = () => {
        setIsAdding(true)

        // Build variant string
        const variantString = Object.entries(selectedVariants)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ") || null

        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0] || "/placeholder-product.jpg",
            quantity,
            variant: variantString,
        })

        toast.success(`${product.name} added to cart!`, {
            description: `Quantity: ${quantity}${variantString ? ` • ${variantString}` : ""}`,
        })

        setTimeout(() => setIsAdding(false), 1500)
    }

    return (
        <>
            {/* Variants */}
            {product.variants.map((variant) => (
                <div key={variant.name} className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        {variant.name}
                    </label>
                    <Select
                        value={selectedVariants[variant.name]}
                        onValueChange={(value) =>
                            setSelectedVariants((prev) => ({ ...prev, [variant.name]: value }))
                        }
                    >
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
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.inventory}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={isAdding || product.inventory === 0}
                >
                    {isAdding ? (
                        <>
                            <Check className="h-5 w-5 mr-2" />
                            Added to Cart!
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </>
                    )}
                </Button>
                <Button size="lg" variant="outline">
                    <Heart className="h-5 w-5" />
                </Button>
            </div>
        </>
    )
}
