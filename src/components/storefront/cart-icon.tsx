"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartIcon() {
    const { itemCount } = useCart()

    return (
        <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                    </span>
                )}
            </Button>
        </Link>
    )
}
