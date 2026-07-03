import { useState, type FC, type PropsWithChildren } from "react";
import { Authcontext } from "./Authcontext";

const Authprovider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setemail] = useState<string | null>(
    localStorage.getItem("email"),
  );
  const [token, settoken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const login = (email: string, token: string) => {
    setemail(email);    
    settoken(token);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    
  };
  const isAuthenticatio = !!token

  return (
    <Authcontext.Provider value={{ email, token, login,isAuthenticatio }}>
      {children}
    </Authcontext.Provider>
  );
};
export default Authprovider;
