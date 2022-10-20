import { flexRender, Table } from '@tanstack/react-table';

import ColumnSearch from './ColumnSearch';

export default function CommentsTable({ table }: { table: Table<any> }) {
  return (
    <table className="text-white border border-gray-400">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width: header.getSize(),
                }}
                className="border-b border-r border-gray-400"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                {header.column.getCanFilter() ? (
                  <div>
                    <ColumnSearch column={header.column} table={table} />
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="border-b border-gray-400">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
