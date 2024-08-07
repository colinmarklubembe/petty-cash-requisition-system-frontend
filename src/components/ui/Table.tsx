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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg text-center">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600"
              >
                {column.label}
              </th>
            ))}
            {renderRowActions && (
              <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderRowActions ? 1 : 0)}
                className="py-3 px-6 text-gray-600"
              >
                No data available. Check back later.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={String(column.key)} className="py-4 px-6 border-b">
                    {renderCustomCell
                      ? renderCustomCell(column.key, item)
                      : String(item[column.key])}
                  </td>
                ))}
                {renderRowActions && (
                  <td className="py-4 px-6 border-b flex justify-center items-center">
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
