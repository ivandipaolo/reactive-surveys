'use client'

import { Divider, Statistic } from "antd"
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
      <div className="flex flex-col mt-5 lg:mt-10 gap-2 justify-center items-center align-middle">
        <h2 className="font-semibold font-sans text-2xl text-center">Get Ready!</h2>
        <h2 className="font-semibold font-sans text-lg text-ellipsis text-center">Your survey will start in:</h2>
        <Countdown
          value={Date.now() + 5 * 1000}
          format="s"
          onFinish={() => setBeginSurvey(true)}
        />
        <p className="font-sans text-md text-ellipsis text-center">Remember, you will need to select an option before the time get over.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <Image
        src={image ?? ImageNotFound}
        className="rounded-md lg:basis-2/4"
        alt="surveyMainImg"
        width={1200}
        height={550}

      />
      <div className="flex flex-col mx-auto items-center">
        <div className="basis-1/5">
          <h1 className="text-2xl lg:text-5xl text-teal-600 font-bold font-sans">{title}</h1>
          <Divider />
        </div>
        {renderSurveyContent()}
      </div>
    </div>
  )
}

export default Layout
