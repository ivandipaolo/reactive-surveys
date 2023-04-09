'use client'

import Link from 'next/link'
import { useState } from "react"
import { Statistic, Button, Image} from "antd"
import { useQuizContract } from "@/hooks/useQuizContract"
import SurveyQuestionsModel from "@/models/SurveyQuestionsModel"
import { observer } from "mobx-react-lite";
import { questions } from '@/surveys_JSON/test_survey.json'


const Page = observer(() => {
  const { submitSurvey } = useQuizContract();
  const [ model ] = useState (() => 
    SurveyQuestionsModel.create({
      questions,
      currentQuestionIndex: 0,
      isSurveyFinished: false,
      surveyAnswers: [],
      currentAnswer: -1,
      currentQuestionLifetime: questions[0].lifetimeSeconds
    })
  )

  const { Countdown } = Statistic

  const finishedSurvey = () => {
    submitSurvey(1, model.surveyAnswers.map((answer) => (answer.answerIndex)))
  }

  return (
    <div>
      {model.isSurveyFinished ? (
        <>
          {
            model.surveyAnswers.map((answer, index) => (
              <div key={"answer"+index}>
                <p>{questions[index].text}</p>
                <p>
                  {answer.answerText}
                </p>
              </div>
            ))
          }
          <Link href='/'>
            <Button type="default" onClick={finishedSurvey}>
              Submit Answers
            </Button>
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-md"
            src={questions[model.currentQuestionIndex].image}
            alt="questionImage"
            width={350}
            height={230}
          />
          <p>{questions[model.currentQuestionIndex].text}</p>
          {
            model.currentAnswer !== -1 && <p>Displaying next question in: </p>
          }
          <Countdown
            value={model.currentAnswer !== -1 ? Date.now() + model.currentQuestionLifetime * 1000 : Date.now() + questions[model.currentQuestionIndex].lifetimeSeconds * 1000}
            format="ss"
            onFinish={() => model.handleCountdownFinished()}
          />
          <div className="flex flex-row gap-2">
            {questions[model.currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => model.handleOptionClicked(option.text, index)}
                disabled={model.currentAnswer !== -1}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )  
})
export default Page
