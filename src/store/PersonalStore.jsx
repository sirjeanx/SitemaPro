import { create } from "zustand";
import {
  BuscarPersonal,
  EditarPersonal,
  EliminarPersonal,
  InsertarPersonal,
  MostrarPersonal,
} from "../index";

export const usePersonalStore = create((set, get) => ({
  buscardor: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datapersonal: [],
  personalItemSelect: [],
  parametros: {},
  mostrarpersonal: async (p) => {
    const response = (await MostrarPersonal(p)) ?? [];
    set({ parametros: p });
    set({ datapersonal: response });
    set({ personalItemSelect: response[0] });
    return response;
  },
  selectpersonal: (p) => {
    set({ personalItemSelect: p });
  },
  insertarpersonal: async (p) => {
    await InsertarPersonal(p);
    const { mostrarpersonal } = get();
    const { parametros } = get();
    set(mostrarpersonal(parametros));
  },
  eliminarpersonal: async (p) => {
    await EliminarPersonal(p);
    const { mostrarpersonal } = get();
    const { parametros } = get();
    set(mostrarpersonal(parametros));
  },
  editarpersonal: async (p) => {
    await EditarPersonal(p);
    const { mostrarpersonal } = get();
    const { parametros } = get();
    set(mostrarpersonal(parametros));
  },
  buscarpersonal: async (p) => {
    const response = await BuscarPersonal(p);
    set({ datapersonal: response });
  },
}));
