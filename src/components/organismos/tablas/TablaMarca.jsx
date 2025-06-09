import styled from "styled-components";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMarcaStore } from "../../../index";
import ReusableTable from "../../organismos/tablas/ReusableTable";
import { IconButton } from "@mui/material";

export function TablaMarca({
  data,
  SetopenRegistro,
  setDataSelect,
  setAccion,
}) {
  const { eliminarMarca } = useMarcaStore();

  const editar = (marca) => {
    if (marca.descripcion === "Generica") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes editar ya que es valor por defecto",
      });
      return;
    }
    SetopenRegistro(true);
    setDataSelect(marca);
    setAccion("Editar");
  };

  const eliminar = (marca) => {
    if (marca.descripcion === "Generica") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes eliminar ya que es valor por defecto",
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "¡Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarMarca({ id: marca.id });
      }
    });
  };

  const columns = [
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      enableSorting: false,
      cell: (info) => (
        <div style={{ display: "flex", gap: 8 }}>
          <IconButton
            aria-label="editar"
            size="small"
            onClick={() => editar(info.row.original)}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            size="small"
            onClick={() => eliminar(info.row.original)}
          >
            <FaTrash />
          </IconButton>
        </div>
      ),
    },
  ];

  if (!data || data.length === 0) return null;

  return (
    <ReusableTable
      columns={columns}
      data={data}
      rowsPerPageOptions={[5, 10, 25, 50]}
      noDataMessage="No hay datos"
    />
  );
}

const Container = styled.div``;

