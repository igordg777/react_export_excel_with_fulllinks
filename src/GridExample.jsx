import React, { useCallback, useMemo, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, 
         //setRowData
        ] = useState([
    { company: 'Google', url: 'https://www.google.com, Google' },
    { company: 'Adobe', url: 'https://www.adobe.com, Adobe' },
    { company: 'The New York Times', url: 'https://www.nytimes.com, The New York Times' },
    { company: 'Twitter', url: 'https://www.twitter.com, Twitter' },
    { company: 'StackOverflow', url: 'https://stackoverflow.com/, StackOverflow' },
    { company: 'Reddit', url: 'https://www.reddit.com, Reddit' },
    { company: 'Github', url: 'https://www.github.com, Github' },
    { company: 'Microsoft', url: 'https://www.microsoft.com, Microsoft' },
    { company: 'Gizmodo', url: 'https://www.gizmodo.com, Gizmodo' },
    { company: 'LinkedIN', url: 'https://www.linkedin.com, LinkedIN' },
  ]);
  const [columnDefs, 
        //setColumnDefs
        ] = useState([
    { field: 'company' },
    { field: 'url', cellClass: 'hyperlinks' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const defaultExcelExportParams = useMemo(() => {
    return {
      autoConvertFormulas: true,
      processCellCallback: (params) => {
        console.log({params});
        const field = params.column.getColDef().field;
        return field === 'url' ? `=HYPERLINK("${params.value.split(", ")[0]}", "${params.value.split(", ")[1]}")` : params.value;
      },
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: 'hyperlinks',
        font: {
          underline: 'Single',
          color: '#358ccb',
        },
      },
    ];
  }, []);

 // const onBtExport = useCallback(() => {
 //   gridRef.current.api.exportDataAsExcel();
 // }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          {/* <button
            onClick={onBtExport}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button> */}
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              defaultExcelExportParams={defaultExcelExportParams}
              excelStyles={excelStyles}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridExample;
