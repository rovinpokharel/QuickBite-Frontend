// import React from 'react'

import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/MyUserApi";

export default function UsernameMenu() {
  const { user, logout, isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {currentUser?.admin && (
          <>
            <DropdownMenuItem>
              <Link
                to="/admin/orders"
                className="font-bold hover:text-orange-500"
              >
                All Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="/admin/restaurants"
                className="font-bold hover:text-orange-500"
              >
                All Restaurants
              </Link>
            </DropdownMenuItem>
            <Separator />
          </>
        )}
        {currentUser?.restaurantAdmin && (
          <>
            <DropdownMenuItem>
              <Link
                to="/restaurant/orders"
                className="font-bold hover:text-orange-500"
              >
                Manage Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="/manage-restaurant"
                className="font-bold hover:text-orange-500"
              >
                Manage Restaurant
              </Link>
            </DropdownMenuItem>
            <Separator />
          </>
        )}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
