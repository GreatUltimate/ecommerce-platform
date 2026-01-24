import { Metadata } from "next"
import { CartContent } from "@/components/storefront/cart-content"

export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "View and manage your shopping cart.",
}

export default function CartPage() {
    return <CartContent />
}

