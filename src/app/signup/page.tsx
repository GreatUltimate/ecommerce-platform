import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import { signUp } from "@/app/actions/auth"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="container flex-1 flex items-center justify-center py-12">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form action={signUp}>
                            {/* Note: This form is client-side only for now. Integration with a server action or API route is needed for real registration. */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-2 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2 mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>

                            <Button className="w-full mt-6" type="submit">Sign Up</Button>

                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="text-sm text-muted-foreground text-center w-full">
                            Already have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
