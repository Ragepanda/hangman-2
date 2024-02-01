import './App.scss'
import React, { useState } from 'react'
import Start from '../Screens/Start'
import Play from '../Screens/Play'

function App () {
  const [appState, setAppState] = useState('start')

  const updateAppState = (input) => {
    setAppState(input)
  }
  return (
    <div className="App">
      {appState === 'start' ? <Start updateAppState={updateAppState}/> : '' }
      {appState === 'play' ? <Play updateAppState={updateAppState}/> : '' }
    </div>
  )
}

export default App
