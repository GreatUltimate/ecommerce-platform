import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"

import { userLogout } from "@/app/actions/auth"

export default function AccountPage() {
    return (
        <div className="container py-10 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and view order history.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <form action={userLogout}>
                        <Button variant="outline" size="sm" type="submit">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        <Button variant="secondary" className="justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Package className="mr-2 h-4 w-4" />
                            Orders
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium">Profile</h3>
                            <p className="text-sm text-muted-foreground">
                                This is how others will see you on the site.
                            </p>
                        </div>
                        <Separator />
                        <div className="rounded-md border p-4 bg-muted/50">
                            <p className="text-sm text-muted-foreground">
                                You are currently viewing a placeholder account page.
                                Authentication integration would display real user data here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
