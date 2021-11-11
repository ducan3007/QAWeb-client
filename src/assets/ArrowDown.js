import * as React from 'react'

const ArrowDown= ({props}) =>{
  return (
    <svg width="36" height="36" viewBox="0 0 36 30" fill="none" color={props} cursor="pointer">
      <path d="M2 10H34L18 26L2 10Z" fill={(props ||"#909090" )} />
    </svg>
  )
}

export default ArrowDown
