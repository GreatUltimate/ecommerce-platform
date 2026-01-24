import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Header } from "@/components/storefront/header"

import { login } from "@/app/actions/auth"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="container flex-1 flex items-center justify-center py-12">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form action={login}>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2 mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>

                            {/* Note: In a real Next.js app, using the server action or next-auth/react 'signIn' is preferred over raw form submission for better UX */}

                            <Button className="w-full mt-6" type="submit">Sign in</Button>

                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="text-sm text-muted-foreground text-center w-full">
                            Don't have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
