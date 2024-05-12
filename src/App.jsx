import { useState } from 'react'
import CustomHeader from './CustomHeader'
import Field from './Field'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomHeader />
      <Field />
    </>
  )
}

export default App
