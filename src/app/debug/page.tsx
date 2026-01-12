import { prisma } from "@/lib/prisma"

export default async function DebugPage() {
    const products = await prisma.product.findMany({
        take: 5,
    })

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Debug Database</h1>
            <pre className="bg-slate-100 p-4 rounded overflow-auto">
                {JSON.stringify(products, null, 2)}
            </pre>
        </div>
    )
}
