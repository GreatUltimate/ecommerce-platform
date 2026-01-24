"use client"

import { PageForm } from "@/components/admin/page-form"
import { createPage } from "@/app/actions/admin"

export default function NewCMSPage() {
    return (
        <PageForm action={createPage} />
    )
}
