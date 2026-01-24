"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

type SettingsFormProps = {
    action: (formData: FormData) => Promise<void>
    initialData?: {
        storeName: string
        description: string | null
        currency: string
        contactEmail: string | null
    }
}

export function SettingsForm({ action, initialData }: SettingsFormProps) {
    return (
        <form action={action} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>
                        Configure the basic details of your store.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="storeName">Store Name</Label>
                        <Input
                            id="storeName"
                            name="storeName"
                            placeholder="My Awesome Store"
                            defaultValue={initialData?.storeName}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Store Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="A brief description of your store..."
                            defaultValue={initialData?.description || ""}
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Input
                                id="currency"
                                name="currency"
                                placeholder="USD"
                                defaultValue={initialData?.currency || "USD"}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input
                                id="contactEmail"
                                name="contactEmail"
                                type="email"
                                placeholder="support@example.com"
                                defaultValue={initialData?.contactEmail || ""}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                </Button>
            </div>
        </form>
    )
}
