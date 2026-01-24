
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding products...')

    // Categories
    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Clothing', slug: 'clothing' },
        { name: 'Accessories', slug: 'accessories' },
        { name: 'Home', slug: 'home' },
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
    }

    // Products
    const accessories = await prisma.category.findUnique({ where: { slug: 'accessories' } })
    const clothing = await prisma.category.findUnique({ where: { slug: 'clothing' } })
    const electronics = await prisma.category.findUnique({ where: { slug: 'electronics' } })

    const products = [
        {
            name: 'Classic T-Shirt',
            slug: 'classic-t-shirt',
            description: 'A comfortable cotton t-shirt.',
            price: 29.99,
            categoryId: clothing?.id,
            published: true,
            featured: true,
            images: ['/placeholder-tshirt.jpg'],
        },
        {
            name: 'Leather Wallet',
            slug: 'leather-wallet',
            description: 'Premium leather wallet with RFID protection.',
            price: 49.99,
            categoryId: accessories?.id,
            published: true,
            featured: true,
        },
        {
            name: 'Wireless Headphones',
            slug: 'wireless-headphones',
            description: 'Noise-cancelling wireless headphones.',
            price: 199.99,
            categoryId: electronics?.id,
            published: true,
            featured: true,
        },
        {
            name: 'Canvas Backpack',
            slug: 'canvas-backpack',
            description: 'Durable canvas backpack for daily use.',
            price: 79.99,
            categoryId: accessories?.id,
            published: true,
            featured: false,
        },
        {
            name: 'Minimalist Watch',
            slug: 'minimalist-watch',
            description: 'Elegant timepiece for any occasion.',
            price: 129.99,
            categoryId: accessories?.id,
            published: true,
            featured: true,
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product
        })
    }

    console.log('Products seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export { }
