import Link from "next/link"

const footerLinks = {
    shop: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products?sort=newest" },
        { name: "Featured", href: "/products?featured=true" },
    ],
    support: [
        { name: "Contact Us", href: "/pages/contact-us" },
        { name: "Shipping Info", href: "/pages/shipping-info" },
        { name: "Returns", href: "/pages/returns" },
    ],
    company: [
        { name: "About Us", href: "/pages/about-us" },
        { name: "Privacy Policy", href: "/pages/privacy-policy" },
        { name: "Terms of Service", href: "/pages/terms-of-service" },
    ],
}

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-bold text-xl">
                            <span className="text-primary">Store</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Quality products delivered to your door. Fast shipping, easy returns.
                        </p>
                    </div>

                    {/* Shop links */}
                    <div>
                        <h3 className="font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support links */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
