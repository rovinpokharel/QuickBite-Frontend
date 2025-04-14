import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  if (isOrdersLoading) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="bg-white dark:bg-gray-800">
        <TabsTrigger value="orders" className="text-gray-900 dark:text-white">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant" className="text-gray-900 dark:text-white">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {orders?.length || 0} active orders
        </h2>
        {orders?.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
        {!orders?.length && (
          <div className="text-gray-700 dark:text-gray-300">No active orders found.</div>
        )}
      </TabsContent>
      <TabsContent value="manage-restaurant" className="bg-gray-50 dark:bg-gray-900 rounded-lg">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
