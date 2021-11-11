import * as React from 'react'

const ArrowUp = ({props})=> {
  return (
    <svg width="36" height="36" viewBox="0 0 36 30" fill="none" color={props} cursor="pointer">
      <path d="M2 26H34L18 10L2 26Z" fill={(props ||"#909090" )} />
    </svg>
  )
}

export default ArrowUp

