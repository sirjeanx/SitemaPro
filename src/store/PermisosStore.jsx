import { create } from "zustand";
import {
  MostrarPermisos,
} from "../index";
import { DataModulosConfiguracion } from "../utils/dataEstatica";

export const usePermisosStore = create((set) => ({
  datapermisos: [],
  permisosConfigurados: [],

  mostrarPermisos: async (p) => {
    const response = await MostrarPermisos(p);
    set({ datapermisos: response });

    const allDocs = DataModulosConfiguracion.map((element) => {
      const statePermiso = response.some((objeto) =>
        objeto.modulos?.nombre?.includes(element.title)
      );
      return { ...element, state: statePermiso };
    });

    set({ permisosConfigurados: allDocs });

    console.log("Permisos procesados:", allDocs);
    return response;
  },

  mostrarPermisosEdit: async (p) => {
    const response = await MostrarPermisos(p);
    set({ datapermisosEdit: response });
    return response;
  },
}));
