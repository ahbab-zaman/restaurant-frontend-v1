'use client'

import { useState, useCallback } from 'react'

interface UsePartySizeOptions {
  initial?: number
  min?: number
  max?: number
}

export function usePartySize(options: UsePartySizeOptions = {}) {
  const { initial = 2, min = 1, max = 20 } = options
  const [partySize, setPartySize] = useState(initial)

  const increment = useCallback(() => {
    setPartySize((prev) => Math.min(prev + 1, max))
  }, [max])

  const decrement = useCallback(() => {
    setPartySize((prev) => Math.max(prev - 1, min))
  }, [min])

  const isAtMin = partySize <= min
  const isAtMax = partySize >= max
  const isLargeParty = partySize >= 6

  return { partySize, increment, decrement, isAtMin, isAtMax, isLargeParty }
}