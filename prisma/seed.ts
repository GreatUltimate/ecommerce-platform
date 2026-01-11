import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
    console.log('🌱 Seeding database...')

    // Create categories
    const electronics = await prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: {
            name: 'Electronics',
            slug: 'electronics',
        },
    })

    const clothing = await prisma.category.upsert({
        where: { slug: 'clothing' },
        update: {},
        create: {
            name: 'Clothing',
            slug: 'clothing',
        },
    })

    const accessories = await prisma.category.upsert({
        where: { slug: 'accessories' },
        update: {},
        create: {
            name: 'Accessories',
            slug: 'accessories',
        },
    })

    const home = await prisma.category.upsert({
        where: { slug: 'home' },
        update: {},
        create: {
            name: 'Home',
            slug: 'home',
        },
    })

    console.log('✅ Categories created')

    // Create products
    const products = [
        {
            name: 'Premium Wireless Headphones',
            slug: 'premium-wireless-headphones',
            description: 'Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, 40-hour battery life, and ultra-comfortable memory foam ear cushions.',
            price: 199.99,
            compareAtPrice: 249.99,
            inventory: 50,
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
            published: true,
            featured: true,
            categoryId: electronics.id,
        },
        {
            name: 'Organic Cotton T-Shirt',
            slug: 'organic-cotton-tshirt',
            description: 'Sustainable and comfortable organic cotton t-shirt. Perfect for everyday wear.',
            price: 39.99,
            compareAtPrice: null,
            inventory: 120,
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
            published: true,
            featured: true,
            categoryId: clothing.id,
        },
        {
            name: 'Minimalist Watch',
            slug: 'minimalist-watch',
            description: 'Elegant minimalist watch with leather band. Timeless design for any occasion.',
            price: 149.99,
            compareAtPrice: 179.99,
            inventory: 25,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
            published: true,
            featured: true,
            categoryId: accessories.id,
        },
        {
            name: 'Leather Wallet',
            slug: 'leather-wallet',
            description: 'Handcrafted genuine leather wallet with RFID protection.',
            price: 59.99,
            compareAtPrice: null,
            inventory: 75,
            images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=500'],
            published: true,
            featured: true,
            categoryId: accessories.id,
        },
        {
            name: 'Smart Fitness Tracker',
            slug: 'smart-fitness-tracker',
            description: 'Track your health and fitness goals with this advanced smart fitness tracker.',
            price: 129.99,
            compareAtPrice: 159.99,
            inventory: 60,
            images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'],
            published: true,
            featured: false,
            categoryId: electronics.id,
        },
        {
            name: 'Ceramic Coffee Mug Set',
            slug: 'ceramic-coffee-mug-set',
            description: 'Set of 4 handcrafted ceramic coffee mugs. Dishwasher and microwave safe.',
            price: 34.99,
            compareAtPrice: null,
            inventory: 40,
            images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500'],
            published: true,
            featured: false,
            categoryId: home.id,
        },
        {
            name: 'Wireless Charging Pad',
            slug: 'wireless-charging-pad',
            description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
            price: 29.99,
            compareAtPrice: 39.99,
            inventory: 100,
            images: ['https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=500'],
            published: true,
            featured: false,
            categoryId: electronics.id,
        },
        {
            name: 'Canvas Backpack',
            slug: 'canvas-backpack',
            description: 'Durable canvas backpack with laptop compartment. Perfect for work or travel.',
            price: 89.99,
            compareAtPrice: null,
            inventory: 35,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
            published: true,
            featured: false,
            categoryId: accessories.id,
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        })
    }

    console.log('✅ Products created')

    // Create an admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.upsert({
        where: { email: 'admin@store.com' },
        update: {},
        create: {
            email: 'admin@store.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created (admin@store.com / admin123)')

    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
