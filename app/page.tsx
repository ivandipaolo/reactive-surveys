'use client';

import { ConnectButton } from '@/components/ConnectButton';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

export default function Page() {
  const { active, account, connector } = useWeb3React();

  useEffect(() => {
    console.log(active, account, connector)
  }, [active])
  
  return (
    <>
    </>
  );
}