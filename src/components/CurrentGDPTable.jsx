import "./CurrentGDPTable.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect, useContext } from 'react';
import ThemeContext from "../context/ThemeContext";
import axios from "axios";

const currentGDP = "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?&format=json&date=2020"

function CurrentGDPTable() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [countresData, setCountresData] = useState([])
  const theme = useContext(ThemeContext)

  useEffect(() => {
    getCurrentGDPData()
  }, [])

  const getCurrentGDPData = async () => {
    const res = await axios.get(currentGDP)
    const data = res.data[1];

    const editedData = [];

    data.forEach(item => {
      const name = item.country.value;
      const value = (item.value / 100000000000).toFixed(1);
      editedData.push({ name, value })
    });

    setCountresData(editedData)
    setIsLoaded(true)
  }

  return (
    <section className="current-GDP-table">
      <TableContainer 
        component={Paper} 
        style={{
          borderRadius: "6px",
          background: theme.isDarkMode ? "rgb(44, 44, 44)" : "rgb(244, 244, 248)"
        }}
      >
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell style={{ color: theme.isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>Countries</TableCell>
              <TableCell align="center" style={{ color: theme.isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>GDP</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {isLoaded && (
              countresData.map(item => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  
                >
                <TableCell component="th" scope="row" style={{ color: theme.isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>
                    {item.name}
                </TableCell>
                  <TableCell align="center" style={{ color: theme.isDarkMode ? "rgb(236, 236, 236)" : "rgb(70, 70, 70)", borderColor: "rgb(172, 172, 175)" }}>{item.value}</TableCell>
                </TableRow>
            )))}
            </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default CurrentGDPTable