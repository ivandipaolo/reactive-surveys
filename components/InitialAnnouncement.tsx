import React from 'react';
import { Button, Result } from 'antd';
import ConnectButton from './ConnectButton';
import { useWalletConnection } from '@/hooks/useWalletConnection';

const InitialAnnouncement = () => {
  const {
    active
  } = useWalletConnection();

  return (
    <>
      { active
        ?
          <Result
            status={active ? "success" : "warning"}
            title={active ? "You are ready for beggining with todays survey! " : "Please log-in into your MetaMask account to continue."}
            subTitle={active ? "Click the button bellow for beggining the survey" : "Click the button bellow to log-in into your MetaMask Account"}
            extra={[
              <Button key="buy">Begin Survey</Button>,
            ]}
          />
        :
        <Result
          status="warning"
          title="Please log-in into your MetaMask account to continue."
          subTitle="Click the button bellow to log-in into your MetaMask Account"
          extra={[
            <div className='flex justify-center items-center'>
              <ConnectButton/>
            </div>
          ]}
        />
      }
    </>
  )
}
export default InitialAnnouncement
