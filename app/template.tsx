'use client'

import { getLibrary } from "@/components/wallet/connectors"
import { Web3ReactProvider } from "@web3-react/core"

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  )
}
