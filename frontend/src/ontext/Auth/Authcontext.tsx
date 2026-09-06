//create context 
//create provider
//create usecontext (create context)

import { createContext, useContext } from "react";

interface AuthcontextType {
    email :string |null,
    token:string | null,
    orders:any[];
    isAuthenticatio:boolean,
    login: (email:string, token:string)=>void,
    logout: ()=>void,
    getmyorders: ()=>void,
    
}
export const Authcontext = createContext<AuthcontextType > ({email:null  ,token:null ,orders:[], isAuthenticatio:false, login:()=>{} ,logout:()=>{},getmyorders:()=>{}});
export const useAuth =()=> useContext(Authcontext);
