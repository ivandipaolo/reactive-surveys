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
  const image = 'https://getthematic.com/insights/content/images/wordpress/2018/04/shutterstock_730381336.jpg'
  
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1>{title}</h1>
      <Image src={image ?? ImageNotFound} alt="surveyMainImg" width={764} height={400}/>
      {
        beginSurvey
        ? <SurveyQuestions questions={questions}></SurveyQuestions>
        : <div className="flex flex-row gap-2 justify-center items-center align-middle">
          <h2>Your survery will start in:</h2>
          <Countdown value={Date.now() + 2 * 1000} format="ss" onFinish={() => setBeginSurvey(true)}/>
        </div>
      }
    </div>
  )
}
export default SurveyTemplate