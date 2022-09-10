import React, { useState, useEffect, useRef } from 'react'

type intervalCallBack = () => void

export const useInterval = (callback: intervalCallBack, delay: number): any => {
  const savedCallback = useRef<intervalCallBack>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
     if(savedCallback.current) savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}