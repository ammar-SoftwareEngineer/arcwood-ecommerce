'use client'
import Image from "next/image";
import loadingGif from "@public/loading/loading.gif";
import { useEffect, useState } from 'react'

const HOLD_AFTER_LOAD_MS = 500;

export default function HexagonLoader() {
  const [hide, setHide] = useState(false)

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
         <Image
        src={loadingGif}
        alt=""
        width={100}
        height={100}
        className=""
        unoptimized
        priority
      />
    </div>
  )
}

