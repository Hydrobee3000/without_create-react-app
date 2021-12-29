import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import MainTable from './Table/Table'
import Header from './Header/Header'
import s from './App.module.css'
import { useSelector } from 'react-redux'

const App = () => {
  const dataTable = useSelector((state) => state.tableReducer.items)
  console.log(dataTable)
  return (
    <Container maxWidth='sx'>
      <Header />
      <MainTable />
    </Container>
  )
}

export default App
