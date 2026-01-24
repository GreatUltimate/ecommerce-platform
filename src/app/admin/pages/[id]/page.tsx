import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageForm } from "@/components/admin/page-form"
import { updatePage } from "@/app/actions/admin"

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditCMSPage({ params }: Props) {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/login")
    }

    const { id } = await params
    const page = await prisma.page.findUnique({
        where: { id }
    })

    if (!page) {
        notFound()
    }

    const updateAction = updatePage.bind(null, page.id)

    return (
        <PageForm
            action={updateAction}
            initialData={page}
            isEditing
        />
    )
}
