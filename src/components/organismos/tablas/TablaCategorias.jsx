import styled from "styled-components";
import { useCategoriasStore } from "../../../index";
import Swal from "sweetalert2";
import ReusableTable from "../../organismos/tablas/ReusableTable";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

export function TablaCategorias({
  data,
  SetopenRegistro,
  setDataSelect,
  setAccion,
}) {
  const { eliminarcategorias } = useCategoriasStore();

  const editar = (data) => {
    if (data.descripcion === "General") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes editar ya que es valor por defecto",
      });
      return;
    }
    SetopenRegistro(true);
    setDataSelect(data);
    setAccion("Editar");
  };
  const eliminar = (p) => {
    if (p.descripcion === "General") {
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
        await eliminarcategorias({ id: p.id });
      }
    });
  };
  const columns = [
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: (info) => (
          <span>{info.getValue()}</span>
      ),
    },
        {
      accessorKey: "color",
      header: "Color",
      cell: (info) => (
        <div data-title="Color" className="ContentCell">
          <Colorcontent color={info.getValue()} $alto="25px" $ancho="25px"/>
         </div> 
      ),
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
  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     columnFilters,
  //   },
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   columnResizeMode: "onChange",
  //   meta: {
  //     updateData: (rowIndex, columnId, value) =>
  //       setData((prev) =>
  //         prev.map((row, index) =>
  //           index === rowIndex
  //             ? {
  //                 ...prev[rowIndex],
  //                 [columnId]: value,
  //               }
  //             : row
  //         )
  //       ),
  //   },
  // });

  return (
   <ReusableTable
      columns={columns}
      data={data}
      rowsPerPageOptions={[5, 10, 25, 50]}
      noDataMessage="No hay datos"
    />
  );
}

const Container = styled.div`

`;
const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  display: flex;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  text-align: center;
`;
