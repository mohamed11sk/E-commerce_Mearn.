import { useState, type FC, type PropsWithChildren } from "react";
import { Authcontext } from "./Authcontext";

const EMAIL_VALUE = "email";
const TOKEN_VALUE = "token";

const Authprovider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setemail] = useState<string | null>(
    localStorage.getItem("email"),
  );
  const [token, settoken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const isAuthenticatio = !!token;
  const login = (email: string, token: string) => {
    setemail(email);
    settoken(token);
    localStorage.setItem(EMAIL_VALUE, email);
    localStorage.setItem(TOKEN_VALUE, token);
  };
  const logout = () => {
    setemail(null);
    settoken(null);
    localStorage.removeItem(EMAIL_VALUE);
    localStorage.removeItem(TOKEN_VALUE);
  };

  return (
    <Authcontext.Provider
      value={{ email, token, isAuthenticatio, login, logout }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export default Authprovider;
