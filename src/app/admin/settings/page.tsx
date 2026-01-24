import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SettingsForm } from "@/components/admin/settings-form"
import { updateSettings } from "@/app/actions/admin"

export const metadata: Metadata = {
    title: "Settings | Admin",
    description: "Manage your store settings.",
}

export default async function AdminSettingsPage() {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/login")
    }

    const settings = await prisma.storeSettings.findUnique({
        where: { id: "settings" }
    })

    const initialData = settings ? {
        storeName: settings.storeName,
        description: settings.description,
        currency: settings.currency,
        contactEmail: settings.contactEmail
    } : undefined

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Configure your store preferences
                </p>
            </div>

            <SettingsForm action={updateSettings} initialData={initialData} />
        </div>
    )
}
