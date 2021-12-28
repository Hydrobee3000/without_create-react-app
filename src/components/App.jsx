import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import MainTable from './Table/Table'
import Header from './Header/Header'
import s from './App.module.css'

const App = () => {
  useEffect(() => {
    axios.get('/data').then(function (response) {
      console.log(response.data)
    })
  }, [])

  return (
    <Container maxWidth='sx'>
      <Header />
      <MainTable />
    </Container>
  )
}

export default App
