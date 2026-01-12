import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/storefront/product-card"
import { Header } from "@/components/storefront/header"
import { Footer } from "@/components/storefront/footer"
import { ArrowRight, Truck, Shield, RefreshCcw } from "lucide-react"
import { prisma } from "@/lib/prisma"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
]

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
      published: true,
    },
    take: 8,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container py-24 md:py-32">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Quality Products
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                Shop our curated collection of premium products. From electronics to fashion,
                find everything you need with fast shipping and easy returns.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900" asChild>
                  <Link href="/products">
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        </section>

        {/* Features Section */}
        <section className="border-b">
          <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground mt-1">Handpicked favorites just for you</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Join Our Newsletter</h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Subscribe to get special offers, free giveaways, and new product announcements.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
