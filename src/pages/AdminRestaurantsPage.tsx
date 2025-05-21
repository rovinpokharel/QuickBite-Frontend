import { useGetAllRestaurants, useDeleteRestaurant } from "@/api/AdminApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function AdminRestaurantsPage() {
  const { restaurants, isLoading } = useGetAllRestaurants();
  const { deleteRestaurant } = useDeleteRestaurant();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleDeleteClick = (restaurantId: string) => {
    setRestaurantToDelete(restaurantId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (restaurantToDelete) {
      await deleteRestaurant(restaurantToDelete);
      queryClient.invalidateQueries("fetchAllRestaurants");
      setIsDeleteDialogOpen(false);
      setRestaurantToDelete(null);
    }
  };

  if (isLoading) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="space-y-5 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {restaurants?.length || 0} total restaurants
        </h2>
        <Link to="/admin/restaurants/add">
          <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
            Add Restaurant
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants?.map((restaurant) => (
          <Card key={restaurant._id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <AspectRatio ratio={16 / 9}>
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.restaurantName}
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
              <CardTitle className="text-2xl font-bold tracking-tight mt-3">
                {restaurant.restaurantName}
              </CardTitle>
              <CardDescription>
                {restaurant.city}, {restaurant.country}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                {restaurant.cuisines.map((item, index) => (
                  <span className="flex" key={item}>
                    <span>{item}</span>
                    {index < restaurant.cuisines.length - 1 && <Dot />}
                  </span>
                ))}
              </div>
              <Separator className="mb-4 bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-2">
                <Link to={`/detail/${restaurant._id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                    View
                  </Button>
                </Link>
                <Link to={`/admin/restaurants/${restaurant._id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDeleteClick(restaurant._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {!restaurants?.length && (
        <div className="text-gray-700 dark:text-gray-300">No restaurants found.</div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this restaurant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 