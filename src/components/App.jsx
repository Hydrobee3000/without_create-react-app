import React from 'react'
import Container from '@mui/material/Container'
import MainTable from './Table/Table'
import Header from './Header/Header'
import s from './App.module.css'

const App = () => {
  return (
    <Container maxWidth='sx' style={{padding: '0'}}>
      <Header />
      <MainTable />
    </Container>
  )
}

export default App
