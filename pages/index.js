import comfy from 'comfy.js'
import gsap from 'gsap'

import { useEffect, useRef, useState, Fragment } from 'react'
const TAG_LIST = [
  { label: 'jhey.dev', icon: 'GLOBE' },
  { label: 'jh3yy', icon: 'TWITTER' },
]
const Tags = () => {
  return (
    <Fragment>
      {TAG_LIST.map((t, index) => (
        <div
          key={t.label}
          className={`text-white text-5xl ${
            index === TAG_LIST.length - 1 ? '' : 'mr-6'
          }`}>
          {t.label}
        </div>
      ))}
    </Fragment>
  )
}

const Live = () => {
  const [message, setMessage] = useState(null)
  const [hue, setHue] = useState(0)
  const bottomBar = useRef(null)
  const sideBar = useRef(null)
  useEffect(() => {
    comfy.Init('jh3yy')
    comfy.onCommand = (user, command, message, flags, extra) => {
      console.info(user, command, message, flags, extra)
      if (command === 'message') setMessage(`${user} says: "${message}"`)
      else if (command === 'hue' && !isNaN(parseInt(message, 10)))
        setHue(message)
      else if (command.toLowerCase() === 'overlayparty') {
        gsap
          .timeline({
            repeat: 10,
            onComplete: () => {
              gsap.set([bottomBar.current, sideBar.current], {
                '--hue': hue,
              })
            },
          })
          .fromTo(
            [bottomBar.current, sideBar.current],
            {
              '--hue': 0,
            },
            {
              duration: 0.5,
              ease: 'none',
              '--hue': 360,
            }
          )
      }
    }
  })
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-black text-5xl">{message}</h1>
      <div
        ref={bottomBar}
        style={{ '--hue': hue }}
        className={`fixed flex items-center bottom-0 h-24 bg-hue w-screen animate-scale-x`}>
        <Tags />
      </div>
      <div
        ref={sideBar}
        style={{ '--hue': hue }}
        className={`fixed right-0 w-24 bg-hue h-screen animate-scale-y`}></div>
    </div>
  )
}

export default Live
