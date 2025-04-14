import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  const formatPrice = (amount: number | undefined) => {
    if (amount === undefined) return "Calculating...";
    return `रु ${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white">Delivering to:</span>
        <span className="text-gray-700 dark:text-gray-300">{order.deliveryDetails.name}</span>
        <span className="text-gray-700 dark:text-gray-300">
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white">Your Order</span>
        <ul className="text-gray-700 dark:text-gray-300">
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white">Total</span>
        <span className="text-gray-700 dark:text-gray-300">{formatPrice(order.totalAmount)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;