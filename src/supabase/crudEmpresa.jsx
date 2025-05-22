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
