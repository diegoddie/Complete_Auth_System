import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/form/LoginForm";

function page() {
  return (
    <div className="py-8 md:py-0">
      <Card className="w-full md:min-w-md">
        <CardHeader className="mb-3">
          <CardTitle className="text-lg md:text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Forgot password?{" "}
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:underline"
            >
              Click here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
