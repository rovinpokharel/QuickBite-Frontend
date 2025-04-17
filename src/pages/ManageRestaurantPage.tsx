import {
  useCreateRestaurant,
  useUpdateRestaurant,
} from "@/api/AdminApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useState } from "react";

export default function ManageRestaurantPage() {
  const [activeTab] = useState<string>("manage-restaurant");
  
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Add Restaurant</h1>
      <ManageRestaurantForm
        onSave={createRestaurant}
        isLoading={isCreateLoading}
      />
    </div>
  );
}
