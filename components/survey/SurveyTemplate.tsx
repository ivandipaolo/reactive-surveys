import { Statistic } from "antd"
import { useState } from "react"
import SurveyQuestions from "@/components/survey/SurveyQuestions"
import data from '@/surveys_JSON/test_survey.json'
import Image from "next/image"
import ImageNotFound from '@/public/not-found.png'

const SurveyTemplate = () => {
  const [beginSurvey, setBeginSurvey] = useState<Boolean>(false)
  const { Countdown } = Statistic
  const {questions, title} = data
  
  return (
    <div className="flex flex-row items-start justify-start gap-3">
      <Image src={data.image ?? ImageNotFound} className="rounded-md" alt="surveyMainImg" width={1000} height={536}/>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        {
          beginSurvey
          ? <SurveyQuestions questions={questions}></SurveyQuestions>
          : <div className="flex flex-row gap-2 justify-center items-center align-middle">
            <h2>Your survery will start in:</h2>
            <Countdown value={Date.now() + 2 * 1000} format="ss" onFinish={() => setBeginSurvey(true)}/>
          </div>
        }
      </div>
    </div>
  )
}
export default SurveyTemplate