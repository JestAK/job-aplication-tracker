'use client';

import { z } from 'zod';

import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type DataTableFeatures } from './data-table-features';
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import EditableSingleLineCell from '@/components/EditableSingleLineCell';
import EditableMultiLineCell from '@/components/EditableMultiLineCell';

const applicationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  note: z.string().optional(),
  status: z
    .enum(['pending', 'processing', 'success', 'failed'])
    .default('pending'),
  date: z.date().optional(),
  cv: z.url().optional(),
  url: z.url().optional(),
});

export type Application = z.infer<typeof applicationSchema>;

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Application>();

// export const columns = columnHelper.columns([
//     columnHelper.accessor("status", {
//         header: "Status",
//     }),
//     columnHelper.accessor("email", {
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Email" />
//         ),
//     }),
//     columnHelper.accessor("amount", {
//         header: () => <div className="text-right">Amount</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("amount"))
//             const formatted = new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "USD",
//             }).format(amount)
//
//             return <div className="text-right font-medium">{formatted}</div>
//         },
//     }),
//
//     columnHelper.display({
//         id: "actions",
//         cell: ({ row }) => {
//             const payment = row.original
//
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger
//                         render={<Button variant="ghost" className="h-8 w-8 p-0" />}
//                     >
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                             onClick={() => navigator.clipboard.writeText(payment.id)}
//                         >
//                             Copy payment ID
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>View payment details</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     }),
//
//     columnHelper.display({
//         id: "select",
//         header: ({ table }) => (
//             <Checkbox
//                 checked={table.getIsAllPageRowsSelected()}
//                 indeterminate={
//                     table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
//                 }
//                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }) => (
//             <Checkbox
//                 checked={row.getIsSelected()}
//                 onCheckedChange={(value) => row.toggleSelected(!!value)}
//                 aria-label="Select row"
//             />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     }),
// ])

export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor('name', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return (
        <EditableSingleLineCell
          value={getValue() || ''}
          onChange={(newValue) => true}
        />
      );
    },
  }),
  columnHelper.accessor('note', {
    header: 'Note',
    cell: ({ getValue }) => {
      return (
        <EditableMultiLineCell
          value={getValue() || ''}
          onChange={(newValue) => true}
        />
      );
    },
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const statuses = applicationSchema.shape.status
        .unwrap()
        .options.map((status) => ({
          label: status.toUpperCase(),
          value: status,
        }));

      return (
        <Select items={statuses} defaultValue={getValue()}>
          <SelectTrigger
            render={
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <SelectValue />
              </Badge>
            }
          ></SelectTrigger>
          <SelectContent alignItemWithTrigger={true}>
            <SelectGroup>
              {statuses.map((status) => (
                <SelectItem
                  className={'my-2'}
                  key={status.value}
                  value={status.value}
                  render={
                    <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {status.label}
                    </Badge>
                  }
                ></SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    filterFn: 'arrHas',
  }),
  columnHelper.accessor('date', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Create Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | undefined;
      return date ? date.toLocaleDateString() : 'N/A';
    },
  }),
  columnHelper.accessor('cv', {
    header: 'CV',
  }),
  columnHelper.accessor('url', {
    header: 'URL',
    cell: ({ getValue }) => {
      return (
        <EditableSingleLineCell
          value={getValue() || ''}
          onChange={(newValue) => true}
        />
      );
    },
  }),
]);
