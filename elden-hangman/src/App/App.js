import './App.scss'
import React, { useState } from 'react'
import Start from '../Screens/Start'
import Warning from '../Screens/Warning'

function App () {
  const [appState, setAppState] = useState('start')

  const updateAppState = (input) => {
    setAppState(input)
  }
  return (
    <div className="App">
      {appState === 'warning' ? <Warning setAppState={updateAppState} /> : '' }
      {appState === 'start' ? <Start /> : '' }
    </div>
  )
}

export default App
