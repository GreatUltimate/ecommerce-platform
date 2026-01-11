import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DollarSign,
    Package,
    ShoppingCart,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage your store.",
}

// Mock stats - will come from database
const stats = [
    {
        title: "Total Revenue",
        value: "$12,450",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
    },
    {
        title: "Orders",
        value: "156",
        change: "+8.2%",
        trend: "up",
        icon: ShoppingCart,
    },
    {
        title: "Products",
        value: "45",
        change: "+3",
        trend: "up",
        icon: Package,
    },
    {
        title: "Customers",
        value: "1,234",
        change: "+18.7%",
        trend: "up",
        icon: Users,
    },
]

const recentOrders = [
    { id: "ORD001", customer: "John Doe", amount: "$199.99", status: "Paid", date: "2 hours ago" },
    { id: "ORD002", customer: "Jane Smith", amount: "$89.99", status: "Processing", date: "5 hours ago" },
    { id: "ORD003", customer: "Bob Johnson", amount: "$349.99", status: "Shipped", date: "1 day ago" },
    { id: "ORD004", customer: "Alice Brown", amount: "$129.99", status: "Delivered", date: "2 days ago" },
    { id: "ORD005", customer: "Charlie Wilson", amount: "$59.99", status: "Paid", date: "3 days ago" },
]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your store.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                                )}
                                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                                    {stat.change}
                                </span>
                                <span>from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Recent Orders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-sm text-muted-foreground">
                                    <th className="pb-3 font-medium">Order ID</th>
                                    <th className="pb-3 font-medium">Customer</th>
                                    <th className="pb-3 font-medium">Amount</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b last:border-0">
                                        <td className="py-3 font-medium">{order.id}</td>
                                        <td className="py-3">{order.customer}</td>
                                        <td className="py-3">{order.amount}</td>
                                        <td className="py-3">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === "Paid" ? "bg-green-100 text-green-800" :
                                                    order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                                                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                                            "bg-gray-100 text-gray-800"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-muted-foreground">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
