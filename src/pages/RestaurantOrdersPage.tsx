import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Order } from "@/types";

export default function RestaurantOrdersPage() {
  const { orders, isLoading } = useGetMyRestaurantOrders();

  if (isLoading) {
    return <span className="text-gray-900 dark:text-white">Loading...</span>;
  }

  if (!orders || orders.length === 0) {
    return <span className="text-gray-900 dark:text-white">No orders found</span>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Restaurant Orders</h1>
      <div className="grid gap-4">
        {orders.map((order: Order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
} 