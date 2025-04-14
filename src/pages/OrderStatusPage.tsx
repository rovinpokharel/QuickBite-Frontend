import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatusPage() {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <span className="text-gray-900 dark:text-white">Loading...</span>;
  }

  if (!orders || orders.length === 0) {
    return <span className="text-gray-900 dark:text-white">No orders found</span>;
  }
  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
