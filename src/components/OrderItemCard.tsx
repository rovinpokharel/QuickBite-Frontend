import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const formatPrice = (amount: number | undefined) => {
    if (amount === undefined) return "रु 0.00";
    return `रु ${amount.toFixed(2)}`;
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div className="text-gray-900 dark:text-white">
            Customer Name:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div className="text-gray-900 dark:text-white">
            Delivery address:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div className="text-gray-900 dark:text-white">
            Time:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">{getTime()}</span>
          </div>
          <div className="text-gray-900 dark:text-white">
            Total Cost:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </CardTitle>
        <Separator className="bg-gray-200 dark:bg-gray-700" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span className="text-gray-900 dark:text-white">
              <Badge variant="outline" className="mr-2 border-gray-300 dark:border-gray-600">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status" className="text-gray-900 dark:text-white">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white dark:bg-gray-800">
              {ORDER_STATUS.map((status) => (
                <SelectItem 
                  key={status.value} 
                  value={status.value}
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
