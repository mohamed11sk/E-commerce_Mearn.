//create context
//create provider
//create usecontext (create context)

import { createContext, useContext } from "react";
import type { CartItems } from "../../../types/CartItemtyoes";

interface CartcontextType {
  CartItems: CartItems[];
  totalamount: number;
  AddItem: (product_id: number) => void;
}
export const CartContext = createContext<CartcontextType>({
  CartItems: [],
  totalamount: 0,
  AddItem: (_id:number) => {},
});
export const useCart = () => useContext(CartContext);
