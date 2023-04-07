import React, { Dispatch, SetStateAction } from 'react'
import { Button, Result } from 'antd'
import ConnectButton from '@/components/ConnectButton'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useQuizContract } from "@/hooks/useQuizContract"

type InitalAnnouncementProps = {
  setStartedQuiz: Dispatch<SetStateAction<Boolean>>
}

const InitialAnnouncement = ({setStartedQuiz}: InitalAnnouncementProps) => {
  const { active } = useWalletConnection()

  const { cooldownPeriod } = useQuizContract()

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
  console.log(cooldownPeriod)
  return (
    <>
      { cooldownPeriod === 0
        ?
          <Result
            status="success"
            title="You are ready for beggining with todays survey! "
            subTitle="Click the button bellow for beggining the survey"
            extra={[
              <Button key="startSurvey" onClick={() => setStartedQuiz(true)}>Begin Survey</Button>,
            ]}
          />
        :
          <Result
            status={active ? "success" : "warning"}
            title={active ? "You are ready for beggining with todays survey! " : "Please log-in into your MetaMask account to continue."}
            subTitle={active ? "Click the button bellow for beggining the survey" : "Click the button bellow to log-in into your MetaMask Account"}
            extra={[
              <Button key="startSurvey" onClick={() => setStartedQuiz(true)}>Continue Waiting</Button>,
            ]}
          />
        }
    </>
  )
}
export default InitialAnnouncement
