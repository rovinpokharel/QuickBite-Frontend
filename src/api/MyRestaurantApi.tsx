import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Query key constants to ensure consistency
const QUERY_KEYS = {
  myRestaurant: "fetchMyRestaurant",
  myRestaurantOrders: "fetchMyRestaurantOrders"
};

type UseGetMyRestaurantOptions = {
  enabled?: boolean;
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return response.json();
  };

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }

  if (isError) {
    toast.error("Failed to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated successfully");
  }

  if (isError) {
    toast.error("Failed to update restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

type UseGetMyRestaurantOrdersOptions = {
  enabled?: boolean;
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant orders");
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { orders, isLoading };
};

export const useUpdateMyRestaurantOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyRestaurantOrderStatusRequest = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateMyRestaurantOrderStatusRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchMyRestaurantOrders");
    }
  });

  if (isSuccess) {
    toast.success("Order status updated successfully");
  }

  if (isError) {
    toast.error("Failed to update order status");
  }

  return {
    updateOrderStatus,
    isLoading,
  };
};
