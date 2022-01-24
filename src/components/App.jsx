import React from 'react'
import Container from '@mui/material/Container'
import MainTable from './Table/Table'
import Header from './Header/Header'
import './App.scss'

const App = () => {
  return (
    <Container maxWidth="sx" style={{ padding: '0' }}>
      <Header />
      <MainTable />
    </Container>
  )
}

export default App
