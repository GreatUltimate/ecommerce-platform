import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Order Confirmed",
    description: "Your order has been successfully placed.",
}

type Props = {
    searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
    const params = await searchParams
    const sessionId = params.session_id

    // In production, you would verify the session with Stripe
    // and fetch order details from the database

    return (
        <div className="container py-16 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>

            <p className="text-muted-foreground mb-8">
                Your order has been confirmed and will be shipped soon.
                We've sent a confirmation email with your order details.
            </p>

            {sessionId && (
                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                    <p className="text-sm text-muted-foreground mb-2">Order Reference</p>
                    <p className="font-mono text-sm">{sessionId.slice(0, 20)}...</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                    <Link href="/account/orders">
                        <Package className="h-4 w-4 mr-2" />
                        View Orders
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/products">
                        Continue Shopping
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            </div>

            <div className="mt-12 p-6 border rounded-lg text-left">
                <h2 className="font-semibold mb-4">What happens next?</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                        <span>You'll receive an order confirmation email with your receipt.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                        <span>We'll prepare your order for shipment within 1-2 business days.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                        <span>You'll receive a shipping confirmation with tracking information.</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
