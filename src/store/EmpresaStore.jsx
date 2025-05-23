import { create } from "zustand";
import { ContarUsersXempresas, MostrarEmpresa } from "../index";

export const useEmpresaStore = create((set, get) => ({
  contadoruser: 0,
  dataempresa: [],
  mostrarEmpresa: async (p) => {
    const response = await MostrarEmpresa(p);
    set({ dataempresa: response });
    return response;
  },
  contarusersXempresas: async (p) => {
    const response = await ContarUsersXempresas(p);
    set({ contadoruser: response });
    return response;
  },
}));
