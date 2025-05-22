import {
  ColumnDef,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState
} from "@tanstack/table-core";
import {Reservation} from "@/features/reservation/reservation.types";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {DataTablePagination} from "@/components/ui/DataTablePagination";
import {DataTableColumnHeader} from "@/components/ui/DataTableColumnHeader";
import {DataTableViewOptions} from "@/components/ui/DataTableViewOptions";

export function ManageReservationsTable({data}: { data: Reservation[] }) {

  const {managedBusiness} = useManagedBusiness();

  // Custom global filter function: checks all string fields for the search value
  function globalStringFilter(row: any, columnId: string, filterValue: string) {
    // Check all string fields in the row
    return Object.values(row.original).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  const columns: ColumnDef<Reservation>[] = [
    {
      id: "actions",
      cell: ({row}) => {
        const reservation = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="w-4 h-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
    {
      accessorKey: "date",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Date"} />
      )
    },
    {
      accessorKey: "time",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Time"} />
      )
    },
    {
      accessorKey: "serviceOfferingId",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Service"} />
      ),
      cell: ({row}) => {

        const serviceName = managedBusiness?.serviceOfferings.find(s => s.id === row.getValue("serviceOfferingId"))?.name || "Err";
        return <div>{serviceName}</div>
      }
    },
    {
      accessorKey: "firstName",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"First Name"} />
      )
    },
    {
      accessorKey: "lastName",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Last Time"} />
      )
    },
    {
      accessorKey: "email",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Email"} />
      )
    },
    {
      accessorKey: "phoneNumber",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Phone Number"} />
      )
    },
    {
      accessorKey: "createdAt",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title={"Created At"} />
      ),
      cell: ({row}) => {
        return <div>{new Date(row.getValue("createdAt")).toDateString()}</div>
      }
    }
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalStringFilter,
    enableGlobalFilter: true,
    state: {
      sorting,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <section className="w-full">

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <DataTableViewOptions table={table} />
      </div>

      <Table className="my-6">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </section>
  )

}
