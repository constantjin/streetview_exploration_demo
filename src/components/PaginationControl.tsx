import { Table } from '@tanstack/react-table';

// An accessory component for controlling pagination
// Reference: https://tanstack.com/table/v8/docs/examples/react/pagination
export default function PaginationControl({ table }: { table: Table<any> }) {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      <button
        className="border border-gray-300 rounded px-1 disabled:text-gray-500 disabled:border-gray-500"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="border border-gray-300 rounded px-1 disabled:text-gray-500 disabled:border-gray-500"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        className="border border-gray-300 rounded px-1 disabled:text-gray-500 disabled:border-gray-500"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="border border-gray-300 rounded px-1 disabled:text-gray-500 disabled:border-gray-500"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="ml-2 text-gray-500"
      >
        {[5, 10, 15, 20].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
