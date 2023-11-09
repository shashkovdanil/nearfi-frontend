'use client'

import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui'

import { useEthersProviderContext } from '@/data/web3'
import { setupWalletSelector } from '@near-wallet-selector/core'
import { setupModal } from '@near-wallet-selector/modal-ui'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import Big from 'big.js'
import {
  CommitButton,
  EthersProviderContext,
  Widget,
  useAccount,
  useCache,
  useInitNear,
  useNear,
  utils,
} from 'near-social-vm'
import React, { useCallback, useEffect, useState } from 'react'
// import { useSignInRedirect } from '@/hooks/useSignInRedirect'

// import { useAuthStore } from '@/stores/auth'
import { useVmStore } from '@/stores/vm'
import { networkId } from '@/utils/config'

export default function VmInitializer() {
  const [signedIn, setSignedIn] = useState(false)
  const [signedAccountId, setSignedAccountId] = useState(null)
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null)
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(
    null,
  )
  const ethersProviderContext = useEthersProviderContext()
  const { initNear } = useInitNear()
  const near = useNear()
  const account = useAccount()
  const cache = useCache()
  const accountId = account.accountId
  // const setAuthStore = useAuthStore(state => state.set)
  const setVmStore = useVmStore(store => store.set)
  // const { requestAuthentication, saveCurrentUrl } = useSignInRedirect()

  useEffect(() => {
    initNear &&
      initNear({
        networkId,
        selector: setupWalletSelector({
          modules: [setupNearWallet()],
          network: networkId,
        }),
        walletConnectCallback: () => {},
      })
  }, [initNear])

  useEffect(() => {
    if (!near) {
      return
    }
    near.selector.then((selector: any) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName }),
      )
    })
  }, [near])

  // const requestSignInWithWallet = useCallback(() => {
  //   saveCurrentUrl()
  //   walletModal?.show()
  //   return false
  // }, [saveCurrentUrl, walletModal])

  const logOut = useCallback(async () => {
    if (!near) {
      return
    }
    const wallet = await (await near.selector).wallet()
    wallet.signOut()
    near.accountId = null
    setSignedIn(false)
    setSignedAccountId(null)
    localStorage.removeItem('accountId')
  }, [near])

  useEffect(() => {
    if (!near) {
      return
    }
    setSignedIn(!!accountId)
    setSignedAccountId(accountId)
  }, [near, accountId])

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance
        ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
        : Big(0),
    )
  }, [account])

  useEffect(() => {
    if (navigator.userAgent !== 'ReactSnap') {
      const pageFlashPrevent = document.getElementById('page-flash-prevent')
      if (pageFlashPrevent) {
        pageFlashPrevent.remove()
      }
    }
  }, [])

  // useEffect(() => {
  //   setAuthStore({
  //     account,
  //     accountId: signedAccountId || '',
  //     availableStorage,
  //     logOut,
  //     refreshAllowance,
  //     requestSignInWithWallet,
  //     signedIn,
  //   })
  // }, [
  //   account,
  //   availableStorage,
  //   logOut,
  //   refreshAllowance,
  //   requestSignInWithWallet,
  //   signedIn,
  //   signedAccountId,
  //   setAuthStore,
  // ])

  useEffect(() => {
    setVmStore({
      CommitButton,
      EthersProvider: EthersProviderContext.Provider,
      Widget,
      cache,
      ethersContext: ethersProviderContext,
      near,
    })
  }, [cache, ethersProviderContext, setVmStore, near])

  return <></>
}
