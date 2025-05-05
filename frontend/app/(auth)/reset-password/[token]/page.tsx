import ResetPasswordForm from "@/components/form/ResetPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function page() {
  return (
    <div className="py-8 md:py-0">
    <Card className="w-full md:min-w-md">
      <CardHeader className="mb-3">
        <CardTitle className="text-lg md:text-2xl font-bold">
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter your new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  </div>
  )
}

export default page