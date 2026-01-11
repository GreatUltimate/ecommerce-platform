import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { items, email } = body

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "No items provided" },
                { status: 400 }
            )
        }

        // Create line items for Stripe
        const lineItems = items.map((item: {
            name: string
            price: number
            quantity: number
            image?: string
        }) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }))

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: lineItems,
            customer_email: email,
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB", "AU"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 999,
                            currency: "usd",
                        },
                        display_name: "Express shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 2,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 3,
                            },
                        },
                    },
                },
            ],
            metadata: {
                // Store order metadata for webhook processing
                source: "ecommerce-platform",
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error) {
        console.error("Error creating checkout session:", error)
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        )
    }
}
