import React, { useEffect, useState } from 'react'
import { mockAPI } from './api/api'
import axios from 'axios'
import s from './App.module.css'

const App = () => {
  let result = mockAPI.getData()
  useEffect(() => {
    axios.get('/data').then(function (response) {
      console.log(response.data)
    })
  }, [])
  return <div>Done</div>
}

export default App
