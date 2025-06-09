import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { FaArrowsAltV } from "react-icons/fa";

const ReusableTable = ({
  columns,
  data,
  pageSizeOptions = [5, 10, 25, 50],
  initialState = {},
  tableTitle = "Tabla",
}) => {
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    manualSorting: false,
    ...initialState,
  });

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <Table size="small" aria-label={tableTitle}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={{ backgroundColor: "#f5f5f5" }}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortDirection =
                  header.column.getIsSorted() === "asc"
                    ? "asc"
                    : header.column.getIsSorted() === "desc"
                    ? "desc"
                    : false;

                return (
                  <TableCell
                    key={header.id}
                    sx={{
                      position: "relative",
                      userSelect: "none",
                      fontWeight: "bold",
                      borderRight: "1px solid #e0e0e0",
                      minWidth: 100,
                      width: header.getSize(),
                    }}
                  >
                    {canSort ? (
                      <TableSortLabel
                        active={!!sortDirection}
                        direction={sortDirection || "asc"}
                        onClick={header.column.getToggleSortingHandler()}
                        IconComponent={FaArrowsAltV}
                        sx={{ fontWeight: "bold" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                    {header.column.getCanResize && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          height: "100%",
                          width: "5px",
                          cursor: "col-resize",
                          userSelect: "none",
                          touchAction: "none",
                        }}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} sx={{ borderRight: "1px solid #f0f0f0" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No hay datos
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={pageSizeOptions}
              count={data.length}
              rowsPerPage={pagination.pageSize}
              page={pagination.pageIndex}
              onPageChange={(e, newPage) =>
                setPagination((prev) => ({ ...prev, pageIndex: newPage }))
              }
              onRowsPerPageChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: parseInt(e.target.value, 10),
                  pageIndex: 0,
                }))
              }
              labelRowsPerPage="Filas por página"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
