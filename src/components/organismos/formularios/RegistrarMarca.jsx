import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  styled,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { Btnsave, ConvertirCapitalize, useMarcaStore } from "../../../index";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { v } from "../../../styles/variables";
import { useEffect } from "react";

export function RegistrarMarca({ onClose, dataSelect, accion, open }) {
  const { insertarMarca, editarMarca } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();

const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  async function onSubmit(data) {
    if (accion === "Editar") {
      const payload = {
        id: dataSelect.id,
        descripcion: ConvertirCapitalize(data.nombre)
      };
      await editarMarca(payload);
    } else {
      const payload = {
        _descripcion: ConvertirCapitalize(data.nombre),
        _idempresa: dataempresa.id
      };
      await insertarMarca(payload);
    }
    onClose(); 
  }
useEffect(() => {
  if (accion === "Editar" && dataSelect?.descripcion) {
    setValue("nombre", dataSelect.descripcion);
  } else if (accion === "Nuevo") {
    setValue("nombre", ""); 
  }
}, [accion, dataSelect, setValue]);
  return (
     <CustomDialog open={open} onClose={onClose} maxWidth={false}>
      <CustomDialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {accion === "Editar" ? "Editar marca" : "Registrar nueva marca"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CustomDialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Marca"
            variant="outlined"
            
            {...register("nombre", { required: true })}
            margin="normal"
          />
          {errors.nombre?.type === "required" && (
            <p style={{ color: "red", marginTop: "-12px" }}>Campo requerido</p>
          )}
        </DialogContent>

        <DialogActions>
          <Btnsave
            icono={<v.iconoguardar />}
            titulo="Guardar"
            bgcolor="#ef552b"
          />
        </DialogActions>
      </form>
      </CustomDialog>
  
  );
}
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '20px',
    background: theme.bgtotal || '#fff',
    boxShadow: '-10px 15px 30px rgba(10, 9, 9, 0.4)',
    padding: '13px 36px 20px 36px',
    width: '500px',
    maxWidth: '85%',
    margin: 'auto',
  },
}));
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 500,
  marginBottom: '20px',
  color: theme.titleColor || '#000',
  backgroundColor: theme.titleBg || 'transparent',
  padding: '16px 0', // opcional para espaciar
}));
