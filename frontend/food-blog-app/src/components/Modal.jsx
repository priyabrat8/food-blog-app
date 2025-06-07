import React from 'react'

export default function Modal({onClose, children}) {
  return (
    <>
    <div className='backdrop' onClick={onClose}>
    </div>
        <dialog className="modal" open>
          {children}
        </dialog>
    </>
  )
}
