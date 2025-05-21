import { useGetMyOrders } from "@/api/OrderApi";
import { useGetAllOrders } from "@/api/AdminApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Order } from "@/types";
import { useGetMyUser } from "@/api/MyUserApi";

export default function OrderStatusPage() {
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const isSuperAdmin = currentUser?.admin && !currentUser?.restaurantAdmin;

  const { orders: myOrders, isLoading: isMyOrdersLoading } = useGetMyOrders({
    enabled: !isUserLoading && !isSuperAdmin,
  });
  const { orders: allOrders, isLoading: isAllOrdersLoading } = useGetAllOrders({
    enabled: !isUserLoading && isSuperAdmin,
  });

  const orders = isSuperAdmin ? allOrders : myOrders;
  const isLoading = isUserLoading || (isSuperAdmin ? isAllOrdersLoading : isMyOrdersLoading);

  if (isLoading) {
    return <span className="text-gray-900 dark:text-white">Loading...</span>;
  }

  if (!orders || orders.length === 0) {
    return <span className="text-gray-900 dark:text-white">No orders found</span>;
  }

  const sortedOrders = [...orders].sort((a: Order, b: Order) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-10">
      {sortedOrders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            {order.restaurant && (
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order.restaurant.imageUrl}
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
