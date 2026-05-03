'use client'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'
import loaderAnimation from '@public/loading/loading.json'
import { useEffect, useRef, useState } from 'react'

const HOLD_AFTER_LOAD_MS = 500
const LOADER_LOTTIE_SPEED = 1

export default function HexagonLoader() {
  const [hide, setHide] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)

  useEffect(() => {

    const handleLoad = () => {
      setTimeout(() => setHide(true), HOLD_AFTER_LOAD_MS)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      opacity: hide ? 0 : 1,
      pointerEvents: hide ? 'none' : 'all',
      transition: 'opacity 0.6s ease',
    }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={loaderAnimation}
        loop
        autoplay
        onDOMLoaded={() => {
          lottieRef.current?.setSpeed(LOADER_LOTTIE_SPEED)
        }}
        style={{ width: 250, height: 250 }}
      />    </div>
  )
}

