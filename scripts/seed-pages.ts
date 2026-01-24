
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const pages = [
        {
            title: 'Contact Us',
            slug: 'contact-us',
            content: '<h1>Contact Us</h1><p>Get in touch with us at support@example.com</p>',
            published: true,
        },
        {
            title: 'Shipping Info',
            slug: 'shipping-info',
            content: '<h1>Shipping Information</h1><p>We ship worldwide. Free shipping on orders over $50.</p>',
            published: true,
        },
        {
            title: 'Returns',
            slug: 'returns',
            content: '<h1>Returns Policy</h1><p>You can return items within 30 days of receipt.</p>',
            published: true,
        },
        {
            title: 'About Us',
            slug: 'about-us',
            content: '<h1>About Us</h1><p>We are a premium e-commerce store dedicated to quality.</p>',
            published: true,
        },
        {
            title: 'Privacy Policy',
            slug: 'privacy-policy',
            content: '<h1>Privacy Policy</h1><p>We respect your privacy and protect your personal data.</p>',
            published: true,
        },
        {
            title: 'Terms of Service',
            slug: 'terms-of-service',
            content: '<h1>Terms of Service</h1><p>By using our site, you agree to these terms.</p>',
            published: true,
        },
    ]

    console.log('Seeding pages...')

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {},
            create: page,
        })
    }

    console.log('Pages seeded successfully.')
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
