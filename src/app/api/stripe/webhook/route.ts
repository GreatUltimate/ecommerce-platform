import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        )
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error("Webhook signature verification failed:", err)
        return NextResponse.json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        )
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session

            // Retrieve session with line items
            const expandedSession = await stripe.checkout.sessions.retrieve(
                session.id,
                { expand: ["line_items"] }
            )

            // Create order in database
            try {
                const order = await prisma.order.create({
                    data: {
                        stripeSessionId: session.id,
                        stripePaymentIntentId: session.payment_intent as string,
                        email: session.customer_email || session.customer_details?.email || "",
                        status: "PAID",
                        subtotal: (session.amount_subtotal || 0) / 100,
                        tax: (session.total_details?.amount_tax || 0) / 100,
                        shipping: (session.total_details?.amount_shipping || 0) / 100,
                        total: (session.amount_total || 0) / 100,
                        shippingAddress: session.shipping_details as object,
                        billingAddress: session.customer_details as object,
                        items: {
                            create: expandedSession.line_items?.data.map((item) => ({
                                productId: "placeholder", // Would need to store product ID in metadata
                                productName: item.description || "Unknown Product",
                                quantity: item.quantity || 1,
                                price: (item.amount_total || 0) / 100 / (item.quantity || 1),
                            })) || [],
                        },
                    },
                })

                console.log("Order created:", order.id)
            } catch (error) {
                console.error("Error creating order:", error)
            }

            break
        }

        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session
            console.log("Checkout session expired:", session.id)
            break
        }

        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log("Payment succeeded:", paymentIntent.id)
            break
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log("Payment failed:", paymentIntent.id)
            break
        }

        default:
            console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
