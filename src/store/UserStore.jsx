import { create } from "zustand";
import {
  EliminarUsers,
  InsertUser,
  MostrarUser,
  MostrarUserTodos,
  supabase,
} from "../index";

export const useUsersStore = create((set, get) => ({
  insertUserAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    if (error) return;
    const datauser = await InsertUser({
      idauth: data.user.id,
      datereg: new Date(),
      typeuser: "admin",
    });
    return datauser;
  },
  iduser: 0,
  mostrarUser: async () => {
    const response = await MostrarUser();
    set({ iduser: response.id });
    return response;
  },
  buscardor: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datausers: [],
  userslItemSelect: [],
  parametros: {},
  mostraruserTodos: async (p) => {
    const response = (await MostrarUserTodos(p)) ?? [];
    set({ parametros: p });
    set({ datausers: response });
    set({ usersItemSelect: response[0] });
    return response;
  },
  selectusers: (p) => {
    set({ usersItemSelect: p });
  },
  insertarusers: async (parametrosAuth, p,datacheckpermisos) => {
    const { data, error } = await supabase.auth.signUp({
      email: parametrosAuth.correo,
      password: parametrosAuth.pass,
    })
    if(error){
        return null
    }
    const dataUserNew= await InsertUser({
        name: p.name,
        n_doc: p.n_doc,
        phone: p.phone,
        adress: p.adress,
        datereg: new Date(),
        state:"activo",
        idauth : data.user.id,
        typeuser: p.typeuser,
        typedoc: p.typedoc,
    })
    await InsetarAsignaciones({
        id_empresa:p.id_empresa,
        id_user:dataUserNew.id
    })
    datacheckpermisos.forEach(async(item) => {
        if(item.check){
            let parametrospermisos={
                id_user:dataUserNew.id,
                idmodulo:item.id
            }
            await InsertarPermisos(parametrospermisos);
        }
    });
    await supabase.auth.signOut();
    return data.user;
  },
  eliminarusers: async (p) => {
    await EliminarUsers(p);
    const { mostrarusers } = get();
    const { parametros } = get();
    set(mostrarusers(parametros));
  },
  editarusers: async (p) => {
    await Editarusers(p);
    const { mostrarusers } = get();
    const { parametros } = get();
    set(mostrarusers(parametros));
  },
  buscarusers: async (p) => {
    const response = await Buscarusers(p);
    set({ datausers: response });
  },
}));
