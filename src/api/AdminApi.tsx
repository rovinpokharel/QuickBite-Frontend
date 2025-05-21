import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Order, Restaurant } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllOrders = (options = {}) => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      method: "GET",
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

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("fetchAllOrders", getAllOrdersRequest, {
    ...options,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { orders, isLoading };
};

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateOrderStatusRequest = async (orderId: string, status: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
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
    isSuccess,
    error,
  } = useMutation(
    ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatusRequest(orderId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchAllOrders");
      },
    }
  );

  if (isSuccess) {
    toast.success("Order status updated!");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { updateOrderStatus, isLoading };
};

export const useGetAllRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllRestaurantsRequest = async (): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/restaurants`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  };

  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery("fetchAllRestaurants", getAllRestaurantsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { restaurants, isLoading };
};

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createRestaurantRequest = async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/restaurants`, {
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
    // isSuccess,
    // error,
  } = useMutation(createRestaurantRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllRestaurants");
      toast.success("Restaurant created!");
      navigate("/admin/restaurants");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return { createRestaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateRestaurantRequest = async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/restaurants/${restaurantFormData.get("restaurantId")}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurant,
    isLoading,
    // isSuccess,
    // error,
  } = useMutation(updateRestaurantRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllRestaurants");
      toast.success("Restaurant updated!");
      navigate("/admin/restaurants");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return { updateRestaurant, isLoading };
};

export const useDeleteRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteRestaurantRequest = async (restaurantId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/restaurants/${restaurantId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete restaurant");
    }

    return response.json();
  };

  const {
    mutate: deleteRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(deleteRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant deleted!");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { deleteRestaurant, isLoading };
}; 