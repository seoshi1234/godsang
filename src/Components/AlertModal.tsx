import React from 'react'

interface AlertModalProps{
  children
  enabled:boolean
}

function AlertModal(props:AlertModalProps) {
  return (
    <div className={`alertModal ${props.enabled && 'enabled'}`}>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default AlertModal