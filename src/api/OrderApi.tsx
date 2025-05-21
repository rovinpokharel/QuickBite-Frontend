import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = (options = {}) => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get orders");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const { data: orders, isLoading, error } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000, // Refetch every 5 seconds
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      retry: 3, // Retry 3 times on failure
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      staleTime: 10000, // Consider data stale after 10 seconds
      onError: (error: Error) => {
        // Only show error toast for initial fetch or if we have no data
        if (!orders) {
          toast.error("Unable to load orders. Please check your connection and try again.");
        }
      },
      ...options,
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutSessionRequest),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to create checkout session");
      }

      return response.json();
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest, {
    onError: (error: Error) => {
      toast.error("Failed to create checkout session. Please try again.");
      reset();
    }
  });

  return {
    createCheckoutSession,
    isLoading,
  };
};
