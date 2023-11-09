import { useBosLoaderStore } from '@/stores/bos-loader'
import { useVmStore } from '@/stores/vm'

type Props = {
  props?: Record<string, unknown>
  src: string
}

export function VmComponent(props: Props) {
  const { EthersProvider, Widget, ethersContext } = useVmStore()

  if (!EthersProvider) {
    return 'loading...'
  }

  return (
    <EthersProvider value={ethersContext}>
      <Widget
        config={{
          redirectMap: props.src,
        }}
        {...props}
      />
    </EthersProvider>
  )
}
