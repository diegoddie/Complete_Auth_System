import ForgotPasswordForm from "@/components/form/ForgotPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function page() {
  return (
    <div className="py-8 md:py-0">
    <Card className="w-full md:min-w-md">
      <CardHeader className="mb-3">
        <CardTitle className="text-lg md:text-2xl font-bold">
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  </div>
  )
}

export default page