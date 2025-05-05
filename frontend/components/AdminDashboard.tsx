import { User } from "@/context/AuthContext"
import ProfileCard from "./ProfileCard"
import { Card, CardTitle, CardContent, CardDescription, CardHeader } from "./ui/card"

function AdminDashboard({users, totalUsers}: {users: User[], totalUsers: number}) {
  return (
    <div className="space-y-6 w-full mx-auto">
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
                <CardDescription>Manage users and view statistics</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Total Users: {totalUsers}</div>
            </CardContent>
        </Card>
        <h2 className="text-xl font-bold mt-8 mb-4">User List</h2>
        <div className="flex flex-wrap gap-4">
            {users.map((user) => (
                <ProfileCard key={user._id} user={user} />
            ))}
        </div>
    </div>
  )
}

export default AdminDashboard
