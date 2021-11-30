import { Fragment } from 'react'
import { useTable, useExpanded } from 'react-table'

const Table = ({ data, columns: userColumns, renderRowSubComponent }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
      } = useTable(
        {
          columns: userColumns,
          data,
        },
        useExpanded
      )

    return (
        <Fragment>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <Fragment key={row.getRowProps().key}>
                                <tr>
                                {row.cells.map(cell => {
                                    return (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                                </tr>
                                {row.isExpanded ? (
                                <tr>
                                    <td colSpan={visibleColumns.length}>
                                    {renderRowSubComponent({ row })}
                                    </td>
                                </tr>
                                ) : null}
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Table