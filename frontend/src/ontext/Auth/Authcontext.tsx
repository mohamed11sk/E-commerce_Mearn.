//create context 
//create provider
//create usecontext (create context)

import { createContext, useContext } from "react";

interface AuthcontextType {
    email :string |null,
    token:string | null,
    login: (email:string, token:string)=>void,
}
export const Authcontext = createContext<AuthcontextType > ({email:null  ,token:null , login:()=>{}  });
export const useAuth =()=> useContext(Authcontext);
