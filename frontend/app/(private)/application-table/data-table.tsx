'use client';
import * as React from 'react';

import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  ColumnResizeDirection,
  ColumnResizeMode,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { features, type DataTableFeatures } from './data-table-features';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  ComboboxContent,
  ComboboxTrigger,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import { PlusIcon, XIcon } from 'lucide-react';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const anchor = useComboboxAnchor();
  const statuses = ['pending', 'processing', 'success', 'failed'];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>('onChange');
  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>('ltr');
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const table = useTable({
    features,
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: 'NameNoteFilter',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  return (
    <>
      <div className="flex items-center py-4">
        <div className="flex">
          <Input
            placeholder="Search"
            value={table.state.globalFilter ?? ''}
            onChange={(event) => {
              setGlobalFilter(event.target.value);
              table.setGlobalFilter(String(event.target.value));
            }}
            className="max-w-sm mr-2"
          />
          <Combobox
            multiple
            autoHighlight
            items={statuses}
            onValueChange={(values) => {
              setSelectedStatuses(values as string[]);
              table.getColumn('status')?.setFilterValue(values);
            }}
          >
            <div ref={anchor} className="flex items-center">
              {selectedStatuses.length > 0 ? (
                <>
                  <ComboboxTrigger
                    render={
                      <Button
                        className="rounded-none rounded-l-xl min-h-full outline-dashed outline"
                        variant="ghost"
                      />
                    }
                  >
                    Status
                  </ComboboxTrigger>
                  <ComboboxChips className="max-w-xs rounded-none rounded-r-xl border-0 outline-dashed outline">
                    <ComboboxValue>
                      {(values) =>
                        values.length > 1 ? (
                          <>
                            <ComboboxChip
                              key={'selected-amount'}
                            >{`${values.length} selected`}</ComboboxChip>
                          </>
                        ) : (
                          <>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                          </>
                        )
                      }
                    </ComboboxValue>
                  </ComboboxChips>
                </>
              ) : (
                <ComboboxTrigger
                  render={
                    <Button
                      className="rounded-none rounded-xl min-h-full outline-dashed outline"
                      variant="ghost"
                    />
                  }
                >
                  Status
                </ComboboxTrigger>
              )}
            </div>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="ml-auto" />}
          >
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="ml-2">
          Create New <PlusIcon></PlusIcon>
        </Button>
      </div>
      {table.getSelectedRowModel().rows.length > 0 && (
        <Button
          className="mb-2"
          variant="destructive"
          onClick={() => {
            table.resetRowSelection();
          }}
        >
          Delete selected
        </Button>
      )}

      <div className="overflow-hidden rounded-md border"></div>
      <div className="overflow-hidden rounded-md border mt-4">
        <Table
          className={`table-fixed ${table.state.columnResizing.isResizingColumn ? 'select-none' : ''}`}
          style={{ width: '100%', minWidth: table.getTotalSize() }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={'border relative'}
                      style={
                        index === headerGroup.headers.length - 1
                          ? undefined
                          : { width: header.getSize() }
                      }
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div className={'overflow-hidden'}>
                            <table.FlexRender header={header} />
                          </div>

                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`
                                                    absolute top-0 ${index < headerGroup.headers.length - 1 ? '-right-1' : 'right-0'}
                                                    h-full w-2
                                                    cursor-col-resize
                                                    hover:bg-blue-400
                                                    ${header.column.getIsResizing() ? 'bg-blue-500' : ''}
                                                `}
                          />
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={'border overflow-hidden'}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Applications.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
