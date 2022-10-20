import { Table } from '@tanstack/react-table';

// An accessory component for setting column visibilities
// Reference: https://tanstack.com/table/v8/docs/examples/react/column-visibility
export default function ColumnVisibilityControl({
  table,
  columnIds,
  columnIdsToLabels,
}: {
  table: Table<any>;
  columnIds: string[];
  columnIdsToLabels: { [key: string]: string };
}) {
  return (
    <div className="flex flex-row items-center">
      {table
        .getAllColumns()
        .filter((column) => columnIds.includes(column.id))
        .map((column) => (
          <div key={column.id} className="pl-2 flex flex-row">
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{' '}
              {columnIdsToLabels[column.id]}
            </label>
          </div>
        ))}
    </div>
  );
}
