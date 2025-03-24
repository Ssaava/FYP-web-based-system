import Link from "next/link"
import { Droplets, AlertTriangle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PageNotFound (){
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-background p-4">
                <Card className="w-full max-w-md mx-auto border-2 dark:border-border">
                    <CardHeader className="text-center pb-2">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <Droplets className="h-16 w-16 text-primary" />
                                <div className="absolute -right-2 -top-2 bg-destructive text-destructive-foreground dark:bg-red-500 dark:text-white rounded-full p-1">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <CardTitle className="text-3xl text-foreground">Page Not Found</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-2 text-muted-foreground dark:text-gray-300">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                        <p className="text-muted-foreground dark:text-gray-400">
                            Please check the URL or navigate back to the dashboard.
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button asChild className="w-full" size="lg">
                            <Link href="/dashboard">
                                <Home className="mr-2 h-4 w-4" />
                                Return to Dashboard
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full dark:border-gray-700 dark:hover:bg-gray-800">
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}