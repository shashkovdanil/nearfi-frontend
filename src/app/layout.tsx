import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { WagmiConfig } from '@/components/wagmi-config'
import dynamic from 'next/dynamic'
import { Martian_Mono } from 'next/font/google'

import './globals.css'

const VmInitializer = dynamic(() => import('../components/vm/VmInitializer'), {
  ssr: false,
})

const martianMono = Martian_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Secure, fast, and easy blockchain-based lending',
  title: 'CoreFi',
}

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={martianMono.className}>
        <VmInitializer />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <WagmiConfig>
            <div className="min-h-full">
              <Header />
              <main className="grid grid-cols-1 md:mt-10">{children}</main>
            </div>
          </WagmiConfig>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
