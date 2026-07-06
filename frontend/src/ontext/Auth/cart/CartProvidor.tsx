import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItems } from "../../../types/CartItemtyoes";



const CartProvidor: FC<PropsWithChildren> = ({ children }) => {

    const [CartItems,SetCartItems]=useState<CartItems[]>([]);
    const [totalamount,Settotalamount]=useState<number>(0);

    const AddItem =(_id:number)=>{
        console.log(_id)
     
    }
   

  

  return (
    <CartContext.Provider
      value={{ CartItems , totalamount ,AddItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvidor;
