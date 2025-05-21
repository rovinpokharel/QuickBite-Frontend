import { useCreateRestaurant } from "@/api/AdminApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/ui/LoadingButton";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection";

const formSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  deliveryPrice: z.coerce.number().min(0, "Delivery price must be 0 or greater"),
  estimatedDeliveryTime: z.coerce.number().min(1, "Estimated delivery time is required"),
  cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image File must be provided",
  path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

export default function AdminAddRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const navigate = useNavigate();

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = async (formData: RestaurantFormData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("restaurantName", formData.restaurantName);
      formDataObj.append("city", formData.city);
      formDataObj.append("country", formData.country);
      formDataObj.append("deliveryPrice", formData.deliveryPrice.toString());
      formDataObj.append("estimatedDeliveryTime", formData.estimatedDeliveryTime.toString());
      formData.cuisines.forEach((cuisine, index) => {
        formDataObj.append(`cuisines[${index}]`, cuisine);
      });
      formData.menuItems.forEach((menuItem, index) => {
        formDataObj.append(`menuItems[${index}][name]`, menuItem.name);
        formDataObj.append(`menuItems[${index}][price]`, menuItem.price.toString());
      });

      if (formData.imageFile) {
        formDataObj.append("imageFile", formData.imageFile);
      }

      await createRestaurant(formDataObj);
      toast.success("Restaurant created successfully");
      navigate("/admin/restaurants");
    } catch (error) {
      toast.error("Failed to create restaurant");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Add Restaurant</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Restaurant Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Price (रु)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />
          <CuisinesSection />
          <Separator className="bg-gray-200 dark:bg-gray-700" />
          <MenuSection />
          <Separator className="bg-gray-200 dark:bg-gray-700" />
          <ImageSection />

          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              Create Restaurant
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
} 