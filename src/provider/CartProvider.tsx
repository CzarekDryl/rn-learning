import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

interface CartProps {
  items: CartItem[];
  total: number;
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: CartItem["id"], amount: -1 | 1) => void;
}

export const CartContext = createContext<CartProps>({
  items: [],
  total: 0,
  onAddItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (id: CartItem["id"], amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              quantity: item.quantity + amount,
            }
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{ items, total, onAddItem: addItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
