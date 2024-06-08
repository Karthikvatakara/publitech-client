import React from 'react'
import Card from './Card'

function cardGroup() {
  return (
    <div className=' grid md:grid-cols-3 xxl:grid-cols-4 grid-cols-1 justify-evenly '>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default cardGroup
