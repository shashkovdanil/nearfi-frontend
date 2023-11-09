import { create } from 'zustand'

type VmState = {
  CommitButton: any
  EthersProvider: any
  Widget: any
  cache: any
  ethersContext: any
  near: any
}

type VmStore = VmState & {
  set: (update: VmState) => void
}

export const useVmStore = create<VmStore>(set => ({
  CommitButton: null,
  EthersProvider: null,
  Widget: null,
  cache: null,
  ethersContext: null,
  near: null,
  set: params => set(() => ({ ...params })),
}))
