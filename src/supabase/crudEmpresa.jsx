import Swal from "sweetalert2";
import { supabase, ObtenerIdAuthSupabase } from "../index";

export const MostrarEmpresa = async (p) => {
  const { data, error } = await supabase
    .from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_user", p.iduser)
    .maybeSingle();
  if (data) {
    return data;
  }
};

// export const ContarUsersXempresas = async (p) => {
//   const { data, error } = await supabase
//     .rpc("contaruserporempresa", { _id_empresa: p.id_empresa }).maybeSingle();

//   if (error) {
//     console.error("Error al contar usuarios:", error);
//     throw error;
//   }

//   return data ?? 0; // Devuelve 0 si no hay resultado
// };
export const ContarUsersXempresas = async (p) => {
  const { data, error } = await supabase
    .rpc("contaruserporempresa", { _id_empresa: p.id_empresa })
    .maybeSingle();
  if (data) {
    return data;
  }
};
