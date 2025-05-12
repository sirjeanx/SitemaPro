import { create } from "zustand";
import {InsertUser,supabase} from "../index";

export const useUsersStore = create((set, get) => ({
insertUserAdmin: async (p) => {
    const {data,error} =   await supabase.auth.signUp({
        email: p.email,
        password: p.password,
    });
    console.log("data user auth",data);
    if(error)return;
   const datauser= await InsertUser(
        {
            idauth: data.user.id,
            datereg: new Date(),
            typeuser: "admin",
        }
    );
    return datauser;
},

}));    