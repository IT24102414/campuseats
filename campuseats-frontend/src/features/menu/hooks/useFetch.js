import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)

    const executeFetch = async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          const text = await res.text()
          throw new Error('Unexpected response: ' + text.slice(0, 100))
        }
        const json = await res.json()
        if (active) setData(json)
      } catch (err) {
        // Fallback to local /menu.json if cloud API is offline / sleeping / unreachable
        if (url !== '/menu.json') {
          try {
            const fallbackRes = await fetch('/menu.json')
            if (fallbackRes.ok) {
              const fallbackJson = await fallbackRes.json()
              if (active) {
                setData(fallbackJson)
                return
              }
            }
          } catch {
            // ignore fallback error
          }
        }
        if (active) setError(err.message)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    executeFetch()

    return () => {
      active = false
    }
  }, [url])

  return { data, isLoading, error }
}
