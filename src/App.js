import './App.css';
import { useMemo, useState, useCallback } from 'react';
import Table from './Table'

function App() {
  const [data] = useState([
    {entity: 'Entity 1', amount: '12', currency: 'USD'},
    {entity: 'Entity 2', amount: '12', currency: 'USD'},
    {entity: 'Entity 3', amount: '52', currency: 'USD'},
    {entity: 'Entity 4', amount: '912', currency: 'GBP'}
  ])

  const columns = useMemo(
    () => [
      {
        Header: 'Entity',
        accessor: 'entity',
        Cell: ({ row, value }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '⬇️' : '➡️'} {value}
          </span>
        ),
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => (
          <div className="text-right">{value}</div>
        )
      },
      {
        Header: 'Currency',
        accessor: 'currency'
      }
    ],
    []
  )

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  )

  return (
    <div className="App">
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  );
}

export default App;
