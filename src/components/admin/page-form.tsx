"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Trash2 } from "lucide-react"

type PageFormProps = {
    action: (formData: FormData) => Promise<void>
    initialData?: {
        title: string
        content: string | null
        published: boolean
    }
    isEditing?: boolean
}

export function PageForm({ action, initialData, isEditing = false }: PageFormProps) {
    const router = useRouter()

    return (
        <form action={action} className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/pages">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isEditing ? "Edit Page" : "New Page"}
                    </h2>
                    <p className="text-muted-foreground">
                        {isEditing ? "Update page content" : "Create a new content page"}
                    </p>
                </div>
                {isEditing && (
                    <Button type="button" variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. About Us"
                                    defaultValue={initialData?.title}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Write your page content here (HTML supported)..."
                                    defaultValue={initialData?.content || ""}
                                    className="min-h-[400px] font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Simple text or HTML content.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select name="published" defaultValue={String(initialData?.published ?? false)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Published</SelectItem>
                                    <SelectItem value="false">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button type="submit" className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            {isEditing ? "Save Changes" : "Create Page"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
