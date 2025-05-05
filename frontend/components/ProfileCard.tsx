import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { User } from "@/context/AuthContext";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-md font-bold">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div>
          <CardTitle className="text-2xl">
            {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>{user.role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              User ID
            </h3>
            <p>{user._id}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Account Created
            </h3>
            <p>{formatDate(user.createdAt)}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Role</h3>
            <p className="capitalize">{user.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
