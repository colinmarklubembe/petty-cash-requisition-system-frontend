import React from "react";

interface TableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderRowActions?: (item: T) => React.ReactNode;
  renderCustomCell?: (key: keyof T, item: T) => React.ReactNode;
}

const Table = <T,>({
  columns,
  data,
  renderRowActions,
  renderCustomCell,
}: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-6 py-3">
                {column.label}
              </th>
            ))}
            {renderRowActions && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderRowActions ? 1 : 0)}
                className="px-6 py-4"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4">
                    {renderCustomCell
                      ? renderCustomCell(column.key, item)
                      : String(item[column.key])}
                  </td>
                ))}
                {renderRowActions && (
                  <td className="px-6 py-4 flex justify-center items-center">
                    {renderRowActions(item)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
