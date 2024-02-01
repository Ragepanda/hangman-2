import React, { useCallback, useState } from 'react'
import useSound from 'use-sound'
import './start.scss'
import logo from '../../Assets/elden-ring-logo.png'
import title from '../../Assets/Elden-Ring-Title.png'
import pressAnyButton from '../../Assets/Press-any-button-1.gif'
import pressAnyButtonActivated from '../../Assets/Press-any-button-2.gif'
import gameStartSound from '../../Assets/sounds/game-start.mp3'
import titleThemeSound from '../../Assets/sounds/title-theme.mp3'

// eslint-disable-next-line react/prop-types
const Start = ({ updateAppState }) => {
  const [openingState, setOpeningState] = useState('warning')
  const [gameStart] = useSound(gameStartSound, { volume: 0.5 }, [])
  const [titleTheme, { stop: stopTheme }] = useSound(titleThemeSound, { volume: 0.4 }, [])

  const gameStartCallback = async () => {
    gameStart()
    setOpeningState('play')
    setTimeout(() => {
      stopTheme()
      updateAppState('play')
    }, 730)
  }

  const warningClick = useCallback(async () => {
    setOpeningState('start')
  }, [])

  return <div
      tabIndex={'0'}
      id={openingState === 'warning' ? 'warning-screen' : 'start-screen'}
      onMouseDown={openingState === 'warning' ? titleTheme : undefined}
      onClick={openingState === 'warning' ? warningClick : gameStartCallback}
      onKeyDownCapture={openingState === 'warning' ? undefined : gameStartCallback}
    >
      {openingState === 'warning'
        ? <p>This App utilizes sound! Please adjust volume accordingly. Click anywhere to continue...</p>
        : <>
        <img className="logo" src={logo} />
        <img className="title" src={title} />
        <img className="press-any-button" src={openingState === 'start' ? pressAnyButton : pressAnyButtonActivated } /> </>}
    </div>
}
export default Start
