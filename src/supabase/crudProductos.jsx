import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarProductos(p) {
     const { error } = await supabase.rpc("insertarproductos", p);
     if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p._descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
 
 
}
export async function MostrarProductos(p) {
 
    const { data } = await supabase
      .from("productos")
      .select()
      .eq("id_empresa", p.id_empresa)
      .order("id", { ascending: true });
    return data;
  
}
export async function EliminarProductos(p) {
 
    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }

}
export async function EditarProductos(p) {
  
    const { error } = await supabase
      .from("productos")
      .update(p)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar Productos", error);
    }

}
export async function EliminarProductosTodas(p) {

    const { error } = await supabase
      .from("productos")
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
export async function BuscarProductos(p) {
  try {
    const { data } = await supabase
      .from("productos")
      .select()
      .eq("id_empresa", p.id_empresa)
      .ilike("descripcion","%"+ p.descripcion+"%")
      
    return data;
  } catch (error) {}
}