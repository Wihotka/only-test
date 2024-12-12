import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  value: number;
}

const AnimatedNumber = ({ value }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)
  const foo = useRef({ bar: 0 })

  useEffect(() => {
    gsap.to(foo.current, {
      bar: Math.round(value),
      duration: 1.2,      
      ease: 'power2.out',
      onUpdate: function () {    
        if (ref.current) ref.current.innerText = `${Math.round(foo.current.bar)}`
      },
    })
  })

  return <span ref={ref}/>
}

export default AnimatedNumber
