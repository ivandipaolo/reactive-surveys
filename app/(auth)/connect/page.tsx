'use client'

import ConnectedTemplate from '@/components/AppTemplate';
import { injected } from '@/components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

export default function ConnectedPage() {
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(injected)
  }, [activate])
  return (
    <ConnectedTemplate/>
  )
}