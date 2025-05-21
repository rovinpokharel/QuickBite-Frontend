import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMyUser } from '@/api/MyUserApi';

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
    const { currentUser, isLoading: isUserLoading } = useGetMyUser();
    const location = useLocation();

    // Show loading state while either auth or user data is loading
    if (isAuthLoading || isUserLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>;
    }

    // Check if the route is an admin route
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
        // For admin routes, check both authentication and admin status
        if (isAuthenticated && currentUser?.admin) {
            return <Outlet />;
        }
        return <Navigate to="/" replace />;
    }

    // For non-admin routes, just check authentication
    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;

    // return (
    //     <div>ProtectedRoute</div>
    // )
}
