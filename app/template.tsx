'use client'

import ConnectedTemplate from "@/components/AppTemplate";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core"

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectedTemplate children={children}/>
    </Web3ReactProvider>
  )
}
