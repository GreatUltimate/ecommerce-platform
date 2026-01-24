import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const page = await prisma.page.findUnique({ where: { slug } })

    if (!page) return { title: 'Page Not Found' }

    return {
        title: page.title,
    }
}

export default async function CMSPage({ params }: Props) {
    const { slug } = await params
    const page = await prisma.page.findUnique({
        where: { slug }
    })

    if (!page || !page.published) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
            <div
                className="prose prose-slate max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: page.content || "" }}
            />
        </div>
    )
}
