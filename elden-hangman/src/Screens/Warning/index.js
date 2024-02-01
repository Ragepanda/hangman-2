import React, { useCallback } from 'react'
import './warning.scss'
import useSound from 'use-sound'
import titleThemeSound from '../../Assets/sounds/title-theme.mp3'

// eslint-disable-next-line react/prop-types
const Warning = ({ setAppState }) => {
  const [titleTheme] = useSound(titleThemeSound, [])
  const onClickEvent = useCallback(() => {
    titleTheme()
    setAppState('start')
  }, [])

  return <div id="warning-screen" onClick={onClickEvent}>
        <p>This App utilizes sound! Please adjust volume accordingly.</p>
        <p>Click anywhere to continue...</p>
    </div>
}
export default Warning
