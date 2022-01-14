import React, { useState } from 'react'
import Container from '@mui/material/Container'
import MainTable from './Table/Table'
import Header from './Header/Header'

const App = () => {

  return (
    <Container maxWidth='sx' style={{padding: '0'}}>
      <Header />
      <MainTable />
    </Container>
  )
}

export default App
