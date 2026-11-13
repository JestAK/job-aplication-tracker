import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  columnResizingFeature,
  columnSizingFeature,
  globalFilteringFeature,
  FilterFn,
  RowData,
  filterFn_arrHas,
} from '@tanstack/react-table';

const NameNoteFilterFn: FilterFn<{}, RowData> = (
  row,
  columnId,
  filterValue
) => {
  const name = String(row.getValue('name') ?? '').toLowerCase();
  const note = String(row.getValue('note') ?? '').toLowerCase();
  const search = String(filterValue ?? '')
    .trim()
    .toLowerCase();

  return name.includes(search) || note.includes(search);
};

export const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    NameNoteFilter: NameNoteFilterFn,
    arrHas: filterFn_arrHas,
  },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
  columnResizingFeature,
  columnSizingFeature,
});

export type DataTableFeatures = typeof features;
