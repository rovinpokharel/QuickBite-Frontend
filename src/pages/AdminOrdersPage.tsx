import { useGetAllOrders } from "@/api/AdminApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminOrdersPage() {
  const { orders, isLoading } = useGetAllOrders();

  if (isLoading) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="space-y-5 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {orders?.length || 0} total orders
      </h2>
      {orders?.map((order) => (
        <OrderItemCard key={order._id} order={order} />
      ))}
      {!orders?.length && (
        <div className="text-gray-700 dark:text-gray-300">No orders found.</div>
      )}
    </div>
  );
} 