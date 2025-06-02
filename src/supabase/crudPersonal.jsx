import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarPersonal(p) {
     const { error } = await supabase.rpc("insertarPersonal", p);
     if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p._descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
 
 
}
export async function MostrarPersonal(p) {
 
    const { data } = await supabase
      .from("personal")
      .select()
      .eq("id_empresa", p.id_empresa)
      .order("id", { ascending: true });
    return data;
  
}
export async function EliminarPersonal(p) {
 
    const { error } = await supabase
      .from("personal")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }

}
export async function EditarPersonal(p) {
  
    const { error } = await supabase
      .from("personal")
      .update(p)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar Personal", error);
    }

}
export async function EliminarPersonalTodas(p) {

    const { error } = await supabase
      .from("personal")
      .delete()
      .eq("idusuario", p.idusuario);
    if (error) {
      alert("Error al eliminar", error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 1000,
    });
 
}
export async function BuscarPersonal(p) {
  try {
    const { data } = await supabase
      .from("personal")
      .select()
      .eq("id_empresa", p.id_empresa)
      .ilike("descripcion","%"+ p.descripcion+"%")
      
    return data;
  } catch (error) {}
}