import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItems } from "../../../types/CartItemtyoes";
import { useAuth } from "../Authcontext";
import { BASE_URL_BACK } from "../../../consts/fileconst";



const CartProvidor: FC<PropsWithChildren> = ({ children }) => {

    const [CartItems,SetCartItems]=useState<CartItems[]>([]);
    const [totalamount,Settotalamount]=useState<number>(0);
    const {token}=useAuth();

  const loadCart = async () => {
    if (!token) {
      SetCartItems([]);
      Settotalamount(0);
      return;
    }

      try {
        const res = await fetch(`${BASE_URL_BACK}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const cartmapitem = data.items.map((item: {
          products: { _id: string; title: string; image: string };
          priceItem: number;
          Quntity: number;
        }) => ({
          _id: item.products._id,
          title: item.products.title,
          image: item.products.image,
          unite_price: String(item.priceItem),
          Quantity: item.Quntity,
        }));
        SetCartItems(cartmapitem);
        Settotalamount(data.totalprince);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
  };

  useEffect(() => {
    loadCart();
  }, [token]);
  

    const AddItem = async(_id:string)=>{
            try {
      const response = await fetch(`http://localhost:3000/cart/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: _id,
          Quntity: 1,
        
        }),
      });
      if(!response.ok){
        return;
      }
      await loadCart();
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
     
    }
    const updatedquantiy = async (product_id:string, quantity:number) => {
      if (quantity < 1) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL_BACK}/cart/item`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product_id,
            Quntity: quantity,
          }),
        });
        if (!response.ok) {
          return;
        }
        await loadCart();
      } catch (err) {
        console.error("Error updating cart quantity", err);
      }
    };
    const deleteitemfromcart = async(product_id : string)=>{
       try {
        const response = await fetch(`${BASE_URL_BACK}/cart/item/${product_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product_id,

          }),
        });
        if (!response.ok) {
          return;
        }
        await loadCart();
      } catch (err) {
        console.error("Error delete cart item", err);
      }

    }
   

    const clearitem = async() => {
       try {
        const response = await fetch(`${BASE_URL_BACK}/cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          return;
        }
        await loadCart();
      } catch (err) {
        console.error("Error clearing cart", err);
      }
    }

  

  return (
    <CartContext.Provider
      value={{ CartItems , totalamount ,AddItem,updatedquantiy ,deleteitemfromcart ,clearitem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvidor;
