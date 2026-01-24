import { redirect } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    LogOut,
    Store
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { auth } from "@/lib/auth"

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Pages", href: "/admin/pages", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Check if user is admin
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/login")
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30">
                {/* Logo */}
                <div className="p-6">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
                        <Store className="h-6 w-6" />
                        <span>Admin</span>
                    </Link>
                </div>

                <Separator />

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {sidebarLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Separator />

                {/* Footer */}
                <div className="p-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/" target="_blank">
                            <Store className="h-4 w-4 mr-2" />
                            View Store
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <header className="h-16 border-b flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Admin User</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
