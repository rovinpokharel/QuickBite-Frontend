// import React from 'react'
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";

export default function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
}
