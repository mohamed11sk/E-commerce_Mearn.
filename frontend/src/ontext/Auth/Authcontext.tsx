//create context 
//create provider
//create usecontext (create context)

import { createContext, useContext } from "react";

interface AuthcontextType {
    email :string |null,
    token:string | null,
    
    isAuthenticatio:boolean,
    login: (email:string, token:string)=>void,
    logout: ()=>void,
}
export const Authcontext = createContext<AuthcontextType > ({email:null  ,token:null , isAuthenticatio:false, login:()=>{} ,logout:()=>{}});
export const useAuth =()=> useContext(Authcontext);
