import React from 'react'
import '../pages/Home/styles.css'
function Items({item}) {
  return (
    <div className='quote-item'>
     <strong>{item.author} : </strong> <q>{item.quote}</q>
    </div>
  )
}

export default Items
