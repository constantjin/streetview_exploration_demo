import { Column, Table } from '@tanstack/react-table';

// An accessory component for filtering rows
// Reference: https://tanstack.com/table/v8/docs/examples/react/filters
export default function ColumnSearch({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return (
    <div className="mb-1 px-2">
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="px-1 w-full appearance-none focus:outline-none bg-transparent border-b border-gray-500 text-gray-300 font-light"
      />
    </div>
  );
}
