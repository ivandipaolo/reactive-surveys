'use client'

import Link from 'next/link'
import { Button, Result } from 'antd'
import WalletStatus from '@/components/WalletStatus'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useQuizContract } from "@/hooks/useQuizContract"

const RootApp = () => {
  const { active, chainId, account } = useWalletConnection()

  const { cooldownPeriodEnded } = useQuizContract()

  if (!active || !account || chainId !== 5 || !cooldownPeriodEnded) {
    return <WalletStatus/>
  }

  return (
    <Result
      status="success"
      title="You are ready to begin today's survey!"
      subTitle="Click the button bellow for beggining the survey"
      extra={[
        <Link href="/survey" key="surveyRef">
          <Button key="startSurvey">Begin Survey</Button>
        </Link>
      ]}
    />
  )
}
export default RootApp
