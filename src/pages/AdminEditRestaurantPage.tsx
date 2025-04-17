import { useParams } from "react-router-dom";
import { useGetAllRestaurants, useUpdateRestaurant } from "@/api/AdminApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function AdminEditRestaurantPage() {
  const { restaurantId } = useParams();
  const { restaurants } = useGetAllRestaurants();
  const { updateRestaurant, isLoading } = useUpdateRestaurant();

  const restaurant = restaurants?.find((r) => r._id === restaurantId);

  if (!restaurant) {
    return <div className="text-gray-900 dark:text-white">Restaurant not found</div>;
  }

  const handleSave = (formData: FormData) => {
    formData.append("restaurantId", restaurantId as string);
    updateRestaurant(formData);
  };

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
} 