'use client'

import { useWalletConnect } from '@/hooks/use-wallet-connect'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const ConnectButton = dynamic(() => import('./connect-button'), {
  ssr: false,
})

export function Header() {
  const { isConnected } = useWalletConnect()

  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:h-24 md:flex-row">
      <div>
        <Link href="/">
          <div className="text-4xl font-black">CoreFi</div>
        </Link>
      </div>
      <nav className="flex flex-wrap items-center gap-4">
        {isConnected && (
          <>
            <Link href="/deposits">Deposits</Link>
            <Link href="/loans">Loans</Link>
          </>
        )}
        <ConnectButton />
      </nav>
    </header>
  )
}
