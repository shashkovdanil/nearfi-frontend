import { useEffect, useState } from 'react'

export function useCoreTokenPrice() {
  const [course, setCourse] = useState<{ ethereum: { usd: number } }>({
    ethereum: {
      usd: 0.39,
    },
  })

  useEffect(() => {
    async function getCourse() {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      )
      const json = await res.json()

      setCourse(json)
    }

    getCourse()
  }, [])

  return course
}
