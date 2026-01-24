"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function CartContent() {
    const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()

    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.06 // 6% tax
    const total = subtotal + shipping + tax

    if (items.length === 0) {
        return (
            <div className="container py-16 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Button asChild>
                    <Link href="/products">
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 p-4 rounded-lg border bg-card"
                        >
                            {/* Product Image */}
                            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <Link
                                    href={`/products/${item.slug}`}
                                    className="font-medium hover:text-primary transition-colors line-clamp-1"
                                >
                                    {item.name}
                                </Link>
                                {item.variant && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {item.variant}
                                    </p>
                                )}
                                <p className="font-bold mt-2">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Quantity & Remove */}
                            <div className="flex flex-col items-end justify-between">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4">
                        <Button variant="ghost" asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="text-destructive"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border bg-card p-6 sticky top-24">
                        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>
                                    {shipping === 0 ? (
                                        <span className="text-green-600">Free</span>
                                    ) : (
                                        `$${shipping.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (6%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {shipping > 0 && subtotal > 0 && (
                            <p className="text-sm text-muted-foreground mt-4">
                                Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                            </p>
                        )}

                        <Button className="w-full mt-6" size="lg" asChild>
                            <Link href="/checkout">
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Secure checkout powered by Stripe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
