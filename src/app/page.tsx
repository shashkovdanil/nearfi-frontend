'use client'

import { BorrowForm } from '@/app/_components/borrow-form'
import { LendForm } from '@/app/_components/lend-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { abi, coreFiContractAddress } from '@/lib/const'
import { formatUsdt } from '@/lib/utils'
import { useVmStore } from '@/stores/vm'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { Widget } from 'near-social-vm'

export default function Home() {
  const [pool, setPool] = useState(BigInt(0))
  // const { EthersProvider, ethersContext, Widget } = useVmStore()

  const { data = BigInt(0) } = useContractRead({
    abi,
    address: coreFiContractAddress,
    functionName: 'getTreasury',
    watch: true,
  })

  useEffect(() => {
    setPool(data)
  }, [data])

  return (
    <>
      <div className="mx-auto mb-8 w-full max-w-6xl px-4">
        <h1 className="text-2xl">Current pool is {formatUsdt(pool)} USDT</h1>
      </div>
      <Tabs className="mx-auto mb-8 w-full max-w-6xl px-4" defaultValue="lend">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lend">Lend</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>
        <TabsContent value="lend">
          <LendForm />
        </TabsContent>
        <TabsContent value="borrow">
          <BorrowForm />
        </TabsContent>
      </Tabs>
      <div style={{ backgroundColor: 'red' }} className="test">
        <Widget
          src="danilshashkov1.testnet/widget/Test2"
          config={{
            redirectMap: 'danilshashkov1.testnet/widget/Test2',
          }}
        />
      </div>
    </>
  )
}
