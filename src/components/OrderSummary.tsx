import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  updateCartItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
};

const OrderSummary = ({ 
  restaurant, 
  cartItems, 
  removeFromCart,
  updateCartItemQuantity 
}: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return totalWithDelivery;
  };

  const handleIncrement = (item: CartItem) => {
    updateCartItemQuantity(item, item.quantity + 1);
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item, item.quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>रु {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {item.name}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleDecrement(item)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleIncrement(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="min-w-20 text-right">रु {item.price * item.quantity}</span>
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>रु {restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;