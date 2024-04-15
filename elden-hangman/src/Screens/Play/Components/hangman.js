import React, { useState, useEffect, useCallback } from 'react'
import './hangman.scss'

const Hangman = () => {
  const [word, setWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [remainingAttempts, setRemainingAttempts] = useState(6)
  const [gameState, setGameState] = useState('playing') // playing, won, lost

  // Words for the game
  const words = ['Margit the Fell Omen',
    'Godrick the Grafted',
    'Red Wolf of Radagon',
    'Rennala, Queen of the Full Moon',
    'Leonine Misbegotten',
    'Ancestor Spirit',
    'Starscourge Radahn',
    'Magma Wyrm Makar',
    'Mimic Tear',
    'Royal Knight Loretta',
    'Regal Ancestor Spirit',
    'Dragonkin Soldier of Nokstella',
    'Valiant Gargoyles',
    'Astel, Naturalborn of the Void',
    'Godskin Noble',
    'Rykard, Lord of Blasphemy',
    'Elemer of the Briar',
    'Godfrey, First Elden Lord',
    'Morgott the Omen King',
    'Mohg, the Omen',
    'Commander Niall',
    'Fire Giant',
    'Loretta, Knight of the Haligtree',
    'Malenia, Blade of Miquella',
    'Godskin Duo',
    'Dragonlord Placidusax',
    'Maliketh, the Black Blade',
    'Lichdragon Fortissax',
    'Mohg, Lord of Blood',
    'Hoarah Loux, Warrior']

  // Pick a random word from the list
  const getRandomWord = () => {
    // return words[Math.floor(Math.random() * words.length)]
    console.log(words[3])
    return words[3]
  }

  // Initialize a new game
  const initializeGame = () => {
    setWord(getRandomWord())
    setGuessedLetters([' ', ','])
    setRemainingAttempts(6)
    setGameState('playing')
  }

  // Check if a letter has already been guessed
  const isLetterAlreadyGuessed = letter => {
    return guessedLetters.includes(letter)
  }

  // Check if the guessed letter is in the word
  const isLetterInWord = letter => {
    if (typeof word === 'string') { return word.includes(letter.toUpperCase()) || word.includes(letter.toLowerCase()) } else { return false }
  }

  // Handle user input
  const handleGuess = letter => {
    if (gameState !== 'playing' || isLetterAlreadyGuessed(letter)) {
      return
    }

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!isLetterInWord(letter)) {
      setRemainingAttempts(remainingAttempts - 1)
    }

    // Check if the game is won
    const wordLetters = word.split('')
    const guessedWord = wordLetters.every(letter => newGuessedLetters.includes(letter.toUpperCase()))
    if (guessedWord) {
      setGameState('won')
    }

    // Check if the game is lost
    if (remainingAttempts === 1) {
      setGameState('lost')
    }
  }

  // Render the word with guessed letters

  const renderWord = useCallback(() => {
    let renderedWord = ''
    for (let i = 0; i < word.length; i++) {
      if (guessedLetters.includes(word[i].toUpperCase())) renderedWord += `${word[i]} `
      else renderedWord += '_ '
    }
    console.log(renderedWord)
    return renderedWord
    // return word.split('').map(letter => (guessedLetters.includes(letter) ? letter : letter === ' ' || letter === ',' ? '  ' : '_ '))
  }, [guessedLetters])

  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className="hangman-game">
      <h1>Hangman Game</h1>
      {gameState === 'playing' && (
        <>
          <div className='hangman-text'>{renderWord()}</div>
          <div>Remaining Attempts: {remainingAttempts}</div>
          <div>
            <p>Guessed Letters:</p>
            <div>
              {Array.from(Array(26), (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map(
                letter => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={isLetterAlreadyGuessed(letter)}
                  >
                    {letter}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
      {gameState === 'won' && <h2>Congratulations! You won!</h2>}
      {gameState === 'lost' && <h2>Sorry, you lost. The word was: {word}</h2>}
      <button onClick={initializeGame}>New Game</button>
    </div>
  )
}

export default Hangman
