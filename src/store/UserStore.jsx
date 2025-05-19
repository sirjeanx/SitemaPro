import { create } from "zustand";
import {InsertUser,MostrarUser,supabase} from "../index";

export const useUsersStore = create((set, get) => ({
insertUserAdmin: async (p) => {
    const {data,error} =   await supabase.auth.signUp({
        email: p.correo,
        password: p.pass,
    });
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
iduser:0,
mostrarUser: async () => {
    const response = await MostrarUser();
    set({iduser: response.id});
    return response;
},

}));    