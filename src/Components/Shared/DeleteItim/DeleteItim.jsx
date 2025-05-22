import React from 'react'
import imgDelete from '../../../assets/delete.svg'
export default function DeleteItim({deleteitem}) {
  
  return (
    <div className='text-center alertDelete'>
      <img src={imgDelete} alt="imgDelete" />
      <h3 className='mt-3'>Delete This {deleteitem} ?</h3>
      <p className='muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
