import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'

const MainTable = () => {
  const dataTable = useSelector((state) => state.tableReducer.items.data)
  const loading = useSelector((state) => state.tableReducer.isFetching)
  if (loading) {
    return (
  <Box sx={{ display: 'flex', paddingLeft: '50%', paddingTop: '15%' }}>
    <CircularProgress />
  </Box>
  )}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightGrey' }}>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Street</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.street}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MainTable
