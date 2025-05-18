import Swal from "sweetalert2";
import {supabase} from "../index"

export const InsertUser = async (p) => {
  const {data,error } = await supabase.from 
  ("users").insert(p).select().maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:"Error inserting user"+ error.message,
    });
  }
  if(data) return data;
}