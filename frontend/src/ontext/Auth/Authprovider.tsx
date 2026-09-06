import { useState, type FC, type PropsWithChildren } from "react";
import { Authcontext } from "./Authcontext";
import { BASE_URL_BACK } from "../../consts/fileconst";

const EMAIL_VALUE = "email";
const TOKEN_VALUE = "token";

const Authprovider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setemail] = useState<string | null>(
    localStorage.getItem("email"),
  );
  const [orders, setorder] = useState([]);
  const [token, settoken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const isAuthenticatio = !!token;
  const login = (email: string, token: string) => {
    setemail(email);
    settoken(token);
    // localStorage.setItem(EMAIL_VALUE, email);
    localStorage.setItem(TOKEN_VALUE, token);
  };
  const logout = () => {
    setemail(null);
    settoken(null);
    localStorage.removeItem(EMAIL_VALUE);
    localStorage.removeItem(TOKEN_VALUE);
  };
  const getmyorders= async()=>{
     try {
            const response = await fetch(`${BASE_URL_BACK}/user/order`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              return;
            }
             const data = await response.json();
            setorder(data)
           
          } catch (err) {
          throw err ;
          }
  }

  return (
    <Authcontext.Provider
      value={{ email, token, isAuthenticatio, login, logout ,getmyorders ,orders }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export default Authprovider;
