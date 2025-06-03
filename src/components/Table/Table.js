import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from '@mui/material';

const CustomTable = ({ data, columns, rowColor }) => {
  
  const [search, setSearch] = useState('');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = data.filter(row =>
    columns.some(col => {
      const value = row[col.accessor];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(search.toLowerCase())
      );
    })
  );

  
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ marginY: 2, padding: 2 }}>
      <TextField
        label="Szukaj"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  align={col.align || 'left'}
                  sx={{ borderRight: idx !== columns.length - 1 ? '1px solid #e0e0e0' : 'none', fontWeight: 'bold', background: '#e3e9f6' }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, rowIdx) => (
              <TableRow
                key={rowIdx}
                sx={{
                  backgroundColor: rowColor ? rowColor(row) : (rowIdx % 2 === 0 ? '#f5f7fa' : '#eaf1fb'),
                }}
              >
                {columns.map((col, colIdx) => (
                  <TableCell
                    key={colIdx}
                    align={col.align || 'left'}
                    sx={{ borderRight: colIdx !== columns.length - 1 ? '1px solid #e0e0e0' : 'none' }}
                  >
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : row[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Wierszy na stronę:"
      />
    </Paper>
  );
};

export default CustomTable;
