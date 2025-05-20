"use client";

import {ColumnDef, getCoreRowModel} from "@tanstack/table-core";
import {User} from "@/features/auth/auth.types";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import {useAuth} from "@/features/auth/hooks/AuthContext";



export

interface DataTableProps {
  data: User[]
}

export function StaffTable({data}: DataTableProps) {
  const {managedBusiness, removeStaffError, isRemovingStaff, removeStaff} = useManagedBusiness();
  const {authUser} = useAuth();

  async function handleRemoveStaff(staffId: string) {

    if (!managedBusiness || !staffId || isRemovingStaff) return;

    await removeStaff(managedBusiness.id, staffId);

    if (removeStaffError) console.error(removeStaffError);
  }

  const staffColumns: ColumnDef<User>[] = [

    {
      accessorKey: "firstName",
      header: "First Name"
    },
    {
      accessorKey: "lastName",
      header: "Last Name"
    },
    {
      accessorKey: "username",
      header: "Email"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {managedBusiness?.owner.id === authUser?.id && <DropdownMenuItem onClick={() => handleRemoveStaff(user.id)}>Remove</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ]


  const table = useReactTable({
    data,
    columns: staffColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={staffColumns.length} className="h-24 text-center">No Results</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}