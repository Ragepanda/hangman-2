import React, { useCallback, useState } from 'react'
import useSound from 'use-sound'
import './start.scss'
import logo from '../../Assets/elden-ring-logo.png'
import title from '../../Assets/Elden-Ring-Title.png'
import pressAnyButton from '../../Assets/Press-any-button-1.gif'
import gameStartSound from '../../Assets/sounds/game-start.mp3'
import titleThemeSound from '../../Assets/sounds/title-theme.mp3'

const Start = () => {
  const [gameState, setGameState] = useState('warning')
  const [gameStart] = useSound(gameStartSound, [])
  const [titleTheme] = useSound(titleThemeSound, [])

  const gameStartCallback = () => {
    console.log('key press')
    gameStart()
  }

  const warningClick = useCallback(async () => {
    setGameState('start')
  }, [])

  return <div
      tabIndex={'0'}
      id={gameState === 'warning' ? 'warning-screen' : 'start-screen'}
      onMouseDown={gameState === 'warning' ? titleTheme : undefined}
      onClick={gameState === 'warning' ? warningClick : gameStartCallback}
      onKeyDownCapture={gameState === 'warning' ? undefined : gameStartCallback}
    >
      {gameState === 'warning'
        ? <p>This App utilizes sound! Please adjust volume accordingly. Click anywhere to continue...</p>
        : <>
        <img className="logo" src={logo} />
        <img className="title" src={title} />
        <img className="press-any-button" src={pressAnyButton} /> </>}
    </div>
}
export default Start
