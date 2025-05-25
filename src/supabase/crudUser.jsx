import Swal from "sweetalert2";
import {supabase,ObtenerIdAuthSupabase} from "../index"

export const InsertUser = async (p) => {
  const {data,error } = await supabase.from 
  ("users").insert(p).select().maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:"Error inserta usuario"+ error.message,
    });
  }
  if(data) return data;
}
export const MostrarUser = async () => {
const idAuthSupabase = await ObtenerIdAuthSupabase();
const {data,error} = await supabase.from("users").select().eq("idauth",idAuthSupabase).maybeSingle();
if (data) {
  return data;
}
}