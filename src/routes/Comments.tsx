import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';

import { streetViewCommentListAtom } from '../stores';

import CommentsTable from '../components/CommentsTable';
import ColumnVisibilityControl from '../components/ColumnVisibilityControl';
import PaginationControl from '../components/PaginationControl';
import IndeterminateCheckbox from '../components/IndeterminateCheckbox';

export default function Comments() {
  const streetViewCommentList = useAtomValue(streetViewCommentListAtom);
  const setStreetViewCommentList = useSetAtom(streetViewCommentListAtom);
  // Sort the comment list only when streetViewCommentList changes
  const sortedStreetViewCommentList = useMemo(
    () =>
      streetViewCommentList.sort(
        // Sort comments by timestamp in a decending order (lastest one goes first)
        (comment1, comment2) =>
          dayjs(comment2.timestamp).isAfter(dayjs(comment1.timestamp)) ? 1 : -1,
      ),
    [streetViewCommentList],
  );
  // State to store selected rows in the table
  const [rowSelection, setRowSelection] = useState({});

  const columnHelper = createColumnHelper<IStreetViewComment>();
  const commentColumns = [
    // Include 'select' column
    // Reference: https://tanstack.com/table/v8/docs/examples/react/row-selection
    {
      id: 'select',
      header: ({ table }: { table: Table<any> }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: { row: Row<any> }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
      size: 30,
    },
    columnHelper.accessor('id', {
      header: () => <span>ID</span>,
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('city', {
      header: () => <span>City</span>,
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('comment', {
      header: () => <span>Comment</span>,
      cell: (info) => info.getValue(),
      size: 400,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('latLngString', {
      header: () => <span>Coordinates</span>,
      cell: (info) => info.getValue(),
      size: 150,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('heading', {
      header: () => <span>Heading</span>,
      cell: (info) => info.getValue(),
      size: 80,
      enableColumnFilter: false,
    }),
  ];

  const commentsTable = useReactTable({
    data: sortedStreetViewCommentList,
    columns: commentColumns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const navigate = useNavigate();

  const handleReturnToExploration = () => {
    navigate('/explore');
  };

  const handleDeleteSelected = () => {
    const selectedIndices = Object.keys(rowSelection).map((key) => Number(key));
    // Filter should be done at the sortedStreetViewCommentList
    const filteredSortedCommentsList = sortedStreetViewCommentList.filter(
      (_, index) => !selectedIndices.includes(index),
    );

    commentsTable.resetRowSelection(); // Reset selected rows
    setStreetViewCommentList(filteredSortedCommentsList);
  };

  // Prepare a csv file from sortedStreetViewCommentsList
  // Reference: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  // Reference: https://stackoverflow.com/questions/11257062/converting-json-object-to-csv-format-in-javascript
  const exportCommentsToCsv = () => {
    // Concat the header (keys of the first object) and all comments list
    let headerContentArray: (string[] | IStreetViewComment)[] = [
      Object.keys(sortedStreetViewCommentList[0]),
    ];
    headerContentArray = headerContentArray.concat(sortedStreetViewCommentList);

    // For each row, stringify the list containing object values (automatically place commas between objects)
    // And join all row with '\r\n'
    const csvContentString = headerContentArray
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            return typeof value === 'string' ? JSON.stringify(value) : value;
          })
          .toString();
      })
      .join('\r\n');

    // Export the constructed CSV string to Blob
    const csvBlob = new Blob([csvContentString], {
      type: 'text/csv;charset=utf-8;',
    });
    const csvUrl = URL.createObjectURL(csvBlob);

    // Generate a download link
    const linkElement = document.createElement('a');
    linkElement.href = csvUrl;
    linkElement.setAttribute('download', 'streetview_comments.csv');
    linkElement.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(csvUrl);
    }, 0);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-row justify-between">
        <p className="text-white text-left">
          ???{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={handleReturnToExploration}
          >
            Return to exploration
          </span>
        </p>
        <p className="text-white text-left">
          ????{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={exportCommentsToCsv}
          >
            Export to CSV
          </span>
        </p>
      </div>
      <div className="mt-2">
        <CommentsTable table={commentsTable} />
      </div>
      <div className="mt-2 w-full flex justify-between text-gray-400">
        <p className="text-red-300 text-left">
          ???{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={handleDeleteSelected}
          >
            Delete selected
          </span>
        </p>
        <ColumnVisibilityControl
          table={commentsTable}
          columnIds={['latLngString', 'heading']}
          columnIdsToLabels={{
            latLngString: 'Coordinates',
            heading: 'Heading',
          }}
        />
      </div>
      <div className="mt-2">
        <PaginationControl table={commentsTable} />
      </div>
    </div>
  );
}
