import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Button, Result, Statistic } from 'antd'
import ConnectButton from '@/components/ConnectButton'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useQuizContract } from "@/hooks/useQuizContract"

type InitalAnnouncementProps = {
  setStartedQuiz: Dispatch<SetStateAction<Boolean>>
}

const InitialAnnouncement = ({setStartedQuiz}: InitalAnnouncementProps) => {
  const { active, chainId, changeNetwork } = useWalletConnection()

  const { cooldownPeriodEnded, remainingTime } = useQuizContract()

  const { Countdown } = Statistic

  if (!active) {
    return ( 
      <Result
      status="warning"
      title="Please log-in into your MetaMask account to continue."
      subTitle="Click the button bellow to log-in into your MetaMask Account"
      extra={[
        <div key="connectDiv" className='flex justify-center items-center'>
          <ConnectButton/>
        </div>
      ]}
      />
    )
  }

  if (chainId !== 5) {
    return <Result
    status="error"
    title="Your current network is not Goerli Testnet Network"
    subTitle="Click the button bellow to change to Goerli Network"
    extra={[
      <Button key="changeNetwork" onClick={async () => await changeNetwork()}>Change Network</Button>,
    ]}
  />;
  }

  return (
    <>
      { cooldownPeriodEnded
        ?
          <Result
            status="success"
            title="You are ready to begin today's survey!"
            subTitle="Click the button bellow for beggining the survey"
            extra={[
              <Button key="startSurvey" onClick={() => setStartedQuiz(true)}>Begin Survey</Button>,
            ]}
          />
        :
          <Result
            status="info"
            title="You have to wait until starting a new survey!"
            subTitle="The following button will be available to click after you complete your waiting time"
            extra={[
                <Countdown
                  key="remainingTime"
                  title="Remaining time:"
                  value={remainingTime}
                  format="HH:mm:ss"
                />,
                <Button 
                  key="startSurvey"
                  onClick={() => setStartedQuiz(true)} 
                  disabled>
                    Continue Waiting
                </Button>
            ]}
          />
        }
    </>
  )
}
export default InitialAnnouncement
