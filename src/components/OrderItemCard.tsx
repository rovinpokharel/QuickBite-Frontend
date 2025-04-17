import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useUpdateOrderStatus as useUpdateOrderStatusAdmin } from "@/api/AdminApi";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { currentUser } = useGetMyUser();
  const { updateRestaurantStatus, isLoading: isUpdateLoading } = useUpdateMyRestaurantOrder();
  const { updateOrderStatus: updateOrderStatusAdmin, isLoading: isUpdateLoadingAdmin } = useUpdateOrderStatusAdmin();

  const handleStatusChange = async (newStatus: string) => {
    if (currentUser?.admin) {
      await updateOrderStatusAdmin({ orderId: order._id, status: newStatus });
    } else {
      await updateRestaurantStatus({ orderId: order._id, status: newStatus });
    }
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
            value={order.status}
            disabled={isUpdateLoading || isUpdateLoadingAdmin}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger id="status" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
              <SelectItem value="placed" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Placed</SelectItem>
              <SelectItem value="paid" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Paid</SelectItem>
              <SelectItem value="inProgress" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">In Progress</SelectItem>
              <SelectItem value="outForDelivery" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Out For Delivery</SelectItem>
              <SelectItem value="delivered" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
