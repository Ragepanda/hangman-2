import React from 'react'
import './item.scss'
import flask from '../../../Assets/crimson-tears.png'
import grace from '../../../Assets/grace.png'

// eslint-disable-next-line react/prop-types
const Item = ({ count, isFlask }) => {
  return <div className='item-container'>
        <img style={isFlask ? { paddingTop: '10px' } : {}} src={isFlask ? flask : grace}/>
        <span>{count}</span>
        <h3 style={isFlask ? { position: 'relative', bottom: '10px' } : {}}>{isFlask ? 'Guesses' : 'Grace'}</h3>
  </div>
}

export default Item
