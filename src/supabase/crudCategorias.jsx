import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarCategorias(p) {
     const { error } = await supabase.rpc("insertarcategorias", p);
     if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p._descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
 
 
}
export async function MostrarCategorias(p) {
 
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("id_empresa", p.id_empresa)
      .order("id", { ascending: true });
    return data;
  
}
export async function EliminarCategorias(p) {
 
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }

}
export async function EditarCategorias(p) {
  
    const { error } = await supabase
      .from("categorias")
      .update(p)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar Categorias", error);
    }

}
export async function EliminarCategoriasTodas(p) {

    const { error } = await supabase
      .from("categorias")
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
export async function BuscarCategorias(p) {
  try {
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("id_empresa", p.id_empresa)
      .ilike("descripcion","%"+ p.descripcion+"%")
      
    return data;
  } catch (error) {}
}