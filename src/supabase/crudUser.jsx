import Swal from "sweetalert2";
import { supabase, ObtenerIdAuthSupabase } from "../index";

export const InsertUser = async (p) => {
  const { data, error } = await supabase
    .from("users")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error inserta usuario" + error.message,
    });
  }
  if (data) return data;
};
export const MostrarUser = async () => {
  const idAuthSupabase = await ObtenerIdAuthSupabase();
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("idauth", idAuthSupabase)
    .maybeSingle();
  if (data) {
    return data;
  }
};
export const MostrarUserTodos = async (p) => {
  const { data, error } = await supabase.rpc("mostrarpersonal", p);
  if (data) {
    return data;
  }
};
export async function EliminarUsers(p) {
  const { error } = await supabase.from("users").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error);
  }
}
export async function EditarUsers(p) {
  const { error } = await supabase.from("users").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar marca", error);
  }
}
export async function BuscarUsers(p) {
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("id_empresa", p.id_empresa)
      .ilike("descripcion", "%" + p.descripcion + "%");

    return data;
  } catch (error) {}
}
//tabla asiganciones
export const InsertAsignaciones = async (p) => {
  const { error } = await supabase.from("asignarempresa").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error insertar asignacion" + error.message,
    });
  }
};
//tabla de permisos
export const InsertPermisos = async (p) => {
  const { error } = await supabase.from("permisos").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error inserta permisos" + error.message,
    });
  }
};
