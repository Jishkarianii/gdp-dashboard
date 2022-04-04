import "./CurrentGDPTable.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function CurrentGDPTable() {
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode)

  return (
    <section className="current-GDP-table">
      <TableContainer 
        component={Paper} 
        style={{
          borderRadius: "6px",
          background: isDarkMode ? "rgb(44, 44, 44)" : "rgb(244, 244, 248)"
        }}
      >
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell style={{ color: isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>Countries</TableCell>
              <TableCell align="center" style={{ color: isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>GDP</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  
                >
                <TableCell component="th" scope="row" style={{ color: isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>
                    {row.name}
                </TableCell>
                <TableCell align="center" style={{ color: isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>{row.calories}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default CurrentGDPTable