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

function useGetMyRestaurant(options: UseGetMyRestaurantOptions = {}) {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    QUERY_KEYS.myRestaurant,
    getMyRestaurantRequest,
    {
      enabled: options.enabled,
      staleTime: 30000,
      cacheTime: 3600000,
      retry: false, // Don't retry on failure for restaurant fetch
    }
  );

  return { restaurant, isLoading };
}

function useCreateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
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
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: (data) => {
      // Update the cache directly instead of refetching
      queryClient.setQueryData(QUERY_KEYS.myRestaurant, data);
      toast.success("Restaurant created!");
    },
    onError: () => {
      toast.error("Unable to create restaurant");
    }
  });

  return { createRestaurant, isLoading };
}

function useUpdateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
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
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest, {
    onSuccess: (data) => {
      // Update the cache directly instead of refetching
      queryClient.setQueryData(QUERY_KEYS.myRestaurant, data);
      toast.success("Restaurant Updated");
    },
    onError: () => {
      toast.error("Unable to update restaurant");
    }
  });

  return { updateRestaurant, isLoading };
}

type UseGetMyRestaurantOrdersOptions = {
  enabled?: boolean;
};

function useGetMyRestaurantOrders(options: UseGetMyRestaurantOrdersOptions = {}) {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    QUERY_KEYS.myRestaurantOrders,
    getMyRestaurantOrdersRequest,
    {
      enabled: options.enabled,
      staleTime: 15000, // Consider data fresh for 15 seconds
      cacheTime: 60000, // Keep data in cache for 1 minute
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      retry: false // Don't retry on failure
    }
  );

  return { orders, isLoading };
}

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

function useUpdateMyRestaurantOrder() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyRestaurantOrderRequest = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${orderId}/status`,
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
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurantOrderRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.myRestaurantOrders);
    },
  });

  if (isSuccess) {
    toast.success("Order status updated!");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { updateRestaurantStatus, isLoading };
}

export {
  useGetMyRestaurant,
  useCreateMyRestaurant,
  useUpdateMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurantOrder,
};
