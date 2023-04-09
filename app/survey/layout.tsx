'use client'

import { Statistic } from "antd"
import Image from "next/image"
import { ReactNode, useState } from "react"
import ImageNotFound from "@/public/not-found.png"
import { useWalletConnection } from "@/hooks/useWalletConnection"
import data from "@/surveys_JSON/test_survey.json"
import WalletStatus from "@/components/WalletStatus"
import { useQuizContract } from "@/hooks/useQuizContract"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { Countdown } = Statistic
  const { active, account, chainId } = useWalletConnection()
  const { cooldownPeriodEnded } = useQuizContract()
  const { title, image } = data
  const [beginSurvey, setBeginSurvey] = useState(false)

  if (!active || !account || chainId !== 5 || !cooldownPeriodEnded) {
    return <WalletStatus/>
  }

  const renderSurveyContent = () => {
    if (beginSurvey) {
      return <main>{children}</main>
    }

    return (
      <div className="flex flex-row gap-2 justify-center items-center align-middle">
        <h2>Your survey will start in:</h2>
        <Countdown
          value={Date.now() + 2 * 1000}
          format="ss"
          onFinish={() => setBeginSurvey(true)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-row items-start justify-start gap-3">
      <Image
        src={image ?? ImageNotFound}
        className="rounded-md"
        alt="surveyMainImg"
        width={1000}
        height={536}
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        {renderSurveyContent()}
      </div>
    </div>
  )
}

export default Layout
