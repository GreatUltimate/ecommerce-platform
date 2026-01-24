import { Header } from "@/components/storefront/header"
import { Footer } from "@/components/storefront/footer"
import { auth } from "@/lib/auth"

export default async function StorefrontLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <div className="flex min-h-screen flex-col">
            <Header user={session?.user} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
