import { create } from "zustand";
import {
  BuscarProductos,
  EditarProductos,
  EliminarProductos,
  InsertarProductos,
  MostrarProductos,
} from "../index";

export const useProductoStore = create((set, get) => ({
  buscardor: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataproductos: [],
  productosItemSelect: [],
  parametros: {},
  mostrarproductos: async (p) => {
    const response = await MostrarProductos(p);
    set({ parametros: p });
    set({ dataproductos: response });
    set({ productosItemSelect: [] });
    return response;
  },
  selectProductos: (p) => {
    set({ productosItemSelect: p });
  },
  insertarproductos: async (p) => {
    await InsertarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
  },
  eliminarproductos: async (p) => {
    await EliminarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
  },
  editarproductos: async (p) => {
    await EditarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
  },
  buscarproductos: async (p) => {
    const response = await BuscarProductos(p);
    set({ dataproductos: response });
    return response;
  },
}));
