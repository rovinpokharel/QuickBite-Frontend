import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useState } from "react";

export default function ManageRestaurantPage() {
  const [activeTab] = useState<string>("manage-restaurant");
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        {isEditing ? "Edit Restaurant" : "Add Restaurant"}
      </h1>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </div>
  );
}
