// Este componente es el "armador visual".
// Recibe los datos y columnas, instancia el hook useReactTable
// y renderiza la tabla usando los componentes de shadcn.

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Props genéricas: acepta cualquier tipo de dato y sus columnas
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Estado local del sorting — TanStack lo usa para saber
  // qué columna está ordenada y en qué dirección
  const [sorting, setSorting] = useState<SortingState>([]);

  // Estado del filtro global — el texto que escribe el usuario
  const [globalFilter, setGlobalFilter] = useState("");

  // useReactTable es el cerebro: recibe datos, columnas y configuración
  // y devuelve métodos + info para renderizar la tabla
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(), // modelo base, siempre requerido
    getSortedRowModel: getSortedRowModel(), // habilita el sorting
    getFilteredRowModel: getFilteredRowModel(), // habilita el filtrado
    getPaginationRowModel: getPaginationRowModel(), // habilita la paginación
  });

  return (
    <div className="space-y-4">
      {/* INPUT DE FILTRO — actualiza globalFilter, el hook re-filtra automáticamente */}
      <Input
        placeholder="Buscar por nombre, email..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      {/* TABLA — componentes visuales de shadcn */}
      <div className="rounded-md border">
        <Table>
          {/* ENCABEZADOS — iteramos los header groups que nos da el hook */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {/* flexRender renderiza el contenido del header
                        (puede ser texto simple o un componente como el botón de sort) */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* FILAS — iteramos las filas que el hook calculó para la página actual */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {/* flexRender renderiza el contenido de la celda
                          (texto simple, Badge, DropdownMenu, etc.) */}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Si no hay filas (filtro sin resultados), mostramos esto
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINACIÓN — botones que llaman a métodos del hook */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {/* Página actual sobre total de páginas */}
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()} // deshabilitado si ya estamos en la primera página
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()} // deshabilitado si ya estamos en la última página
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
