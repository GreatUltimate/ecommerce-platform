import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, Truck, CheckCircle, XCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "Orders | Admin",
    description: "Manage your orders.",
}

// Mock orders - will come from database
const orders = [
    {
        id: "ORD001",
        customer: "John Doe",
        email: "john@example.com",
        total: 199.99,
        status: "PAID",
        items: 2,
        date: "2024-01-10T10:30:00",
    },
    {
        id: "ORD002",
        customer: "Jane Smith",
        email: "jane@example.com",
        total: 89.99,
        status: "PROCESSING",
        items: 1,
        date: "2024-01-10T09:15:00",
    },
    {
        id: "ORD003",
        customer: "Bob Johnson",
        email: "bob@example.com",
        total: 349.99,
        status: "SHIPPED",
        items: 3,
        date: "2024-01-09T14:45:00",
    },
    {
        id: "ORD004",
        customer: "Alice Brown",
        email: "alice@example.com",
        total: 129.99,
        status: "DELIVERED",
        items: 1,
        date: "2024-01-08T11:20:00",
    },
    {
        id: "ORD005",
        customer: "Charlie Wilson",
        email: "charlie@example.com",
        total: 59.99,
        status: "CANCELLED",
        items: 1,
        date: "2024-01-07T16:00:00",
    },
]

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-orange-100 text-orange-800",
}

export default function AdminOrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <p className="text-muted-foreground">
                    View and manage customer orders
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search orders..."
                                className="pl-10"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-[70px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.customer}</p>
                                            <p className="text-sm text-muted-foreground">{order.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{order.items} item{order.items !== 1 ? "s" : ""}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[order.status]}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(order.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/orders/${order.id}`}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                {order.status === "PAID" && (
                                                    <DropdownMenuItem>
                                                        <Truck className="h-4 w-4 mr-2" />
                                                        Mark as Shipped
                                                    </DropdownMenuItem>
                                                )}
                                                {order.status === "SHIPPED" && (
                                                    <DropdownMenuItem>
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Mark as Delivered
                                                    </DropdownMenuItem>
                                                )}
                                                {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                                                    <DropdownMenuItem className="text-destructive">
                                                        <XCircle className="h-4 w-4 mr-2" />
                                                        Cancel Order
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
