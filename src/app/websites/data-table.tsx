"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/spinner"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
 
  return (
    <div className="rounded-md border w-full ">
      <Table className="w-[70vw] md:w-[60vw] mt-[5vw]">
     
        <TableBody>
          {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row, index) => 
          index === 0 ? (
            <div className="">
               <TableRow
            className="flex flex-row h-auto bg-[white] mb-[5vw] rounded-3xl" 
            id={index.toString()}
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell, cindex) => (
              cindex === 0 ? (
                // Render the first cell as is
                <TableCell className="w-2/4 border-[0.3vw] rounded-l-2xl border-[#fa9886] " key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ) : null // Skip rendering here; render remaining cells later
            ))}          
            <div className="w-2/4 bg-[#fec5bb] flex flex-col border-[0.3vw] border-l-0 rounded-l-none rounded-r-2xl border-[#fa9886] ">
              {row.getVisibleCells().map((cell, cindex) =>
                {
                if (cindex > 0 && cindex < 3) {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              } else if (cindex === 3) {
                return (
                  <TableCell className="h-full" key={cell.id}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              } else {
                return null;
              }
                }
              )}
            </div>
          </TableRow>
          <TableHeader className="w-full">
           {table.getHeaderGroups().map((group) => (
            <TableRow className="flex flex-row justify-between" key={group.id}>
              {group.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                )
              })}
            </TableRow>
           ))}
          </TableHeader>
          </div>
          ) :          
          (
          <TableRow
            className="flex flex-row h-auto bg-transparent mb-[5vw] rounded-3xl border-b-0"
            id={index.toString()}
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell, cindex) => (
              cindex === 0 ? (
                
                <TableCell className="w-1/4 border-[0.3vw] rounded-2xl border-[#fa9886] overflow-hidden bg-white "key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ) : null 
            ))}
            {/* Group all remaining cells in a single div */}
            <div className="w-3/4 bg-transparent flex flex-col overflow-hidden">
              {row.getVisibleCells().map((cell, cindex) =>
                {
                if (cindex > 0 && cindex < 3) {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              } else if (cindex === 3) {
                return (
                  <TableCell className="h-full" key={cell.id}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              } else {
                return null;
              }
                }
              )}
            </div>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-screen min-h-screen flex-col text-xl font-SB items-center flex justify-center text-center">
            <LoadingSpinner size={100}></LoadingSpinner>
            Loading Results
          </TableCell>
        </TableRow>
      )}
        </TableBody>
      </Table>
    </div>
  )
}