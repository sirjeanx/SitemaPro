import { create } from "zustand";
import {InsertUser} from "../supabase/crudUser";

export const useUserStore = create((set, get) => ({
insertarUserAdmin: async (p) => {
    const {data,error} =   await supabase.auth.signUp({
        email: p.email,
        password: p.password,
    });
    if(error)return null;
    await InsertUser(
        {
            idauth: data.user.id,
            datereg: new Date(),
            typeuser: "admin"
        }
    )
},

}));    