'use client'

import type { PropsWithChildren } from 'react'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig as Config } from 'wagmi'
import { aurora, auroraTestnet } from 'wagmi/chains'

const projectId =
  (process.env.NEXT_PUBLIC_PROJECT_ID as string) ||
  'c8fc8e2fde9bd76805cd028987b7664c'
const isTestnet = process.env.NEXT_PUBLIC_IS_TESTNET === 'true'

const metadata = {
  description: 'Web3Modal Example',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  name: 'Web3Modal',
  url: 'https://web3modal.com',
}

const chains = [isTestnet ? auroraTestnet : aurora]
const wagmiConfig = defaultWagmiConfig({ chains, metadata, projectId })

createWeb3Modal({
  chains,
  projectId,
  themeVariables: {
    '--w3m-font-family': 'Martian Mono, monospace',
    '--w3m-font-size-master': '8px',
  },
  wagmiConfig,
})

export function WagmiConfig({ children }: PropsWithChildren) {
  return <Config config={wagmiConfig}>{children}</Config>
}
