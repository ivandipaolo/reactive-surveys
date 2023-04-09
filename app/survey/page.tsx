'use client'

import { Button, Collapse, Image, Statistic } from "antd"
import Link from "next/link"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useQuizContract } from "@/hooks/useQuizContract"
import { questions } from "@/surveys_JSON/test_survey.json"
import { SurveyAnswer } from "@/types"
import SurveyQuestionsModel from "@/models/SurveyQuestionsModel"

const { Countdown } = Statistic

const Page = observer(() => {
  const { submitSurvey } = useQuizContract()

  const [currentSelection, setCurrentSelection] = useState<string>('')
  
  const [model] = useState(() => {
    return SurveyQuestionsModel.create({
      questions,
      currentQuestionIndex: 0,
      isSurveyFinished: false,
      surveyAnswers: [],
      currentAnswer: -1,
      currentQuestionLifetime: questions[0].lifetimeSeconds,
    })
  })

  const { Panel } = Collapse

  const handleOptionClicked = (optionText: string, index: number) => {
    model.handleOptionClicked(optionText, index)
    setCurrentSelection(optionText)
  }

  const handleCountdownFinished = () => {
    model.handleCountdownFinished()
  }

  const finishedSurvey = () => {
    const answerIndices = model.surveyAnswers.map(
      (answer: SurveyAnswer) => answer.answerIndex
    )
    submitSurvey((new Date()).getDay(), answerIndices)
  }

  return (
    <div>
      {model.isSurveyFinished ? (
        <div className="flex flex-col gap-4 lg:gap-6 items-center justify-center">
          <Collapse defaultActiveKey={['1']}>
            {model.surveyAnswers.map((answer: SurveyAnswer, index:number) => (
              <Panel header={questions[index].text} key={`answer${index}`}>
                <p>{answer.answerText}</p>
              </Panel>
            ))}
          </Collapse>
          <Link href="/">
            <Button type="default" onMouseDown={finishedSurvey}>
              Submit Answers
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="font-semibold font-sans text-lg text-ellipsis text-center">
            {questions[model.currentQuestionIndex].text}
          </p>
          <Image
            className="rounded-md"
            src={questions[model.currentQuestionIndex].image}
            alt="questionImage"
            width={300}
            height={150}
          />
          {model.currentAnswer !== -1 && <p className="font-semibold font-sans text-lg text-ellipsis text-center">Displaying next question in: </p>}
          <Countdown
            value={
              model.currentAnswer !== -1
                ? Date.now() + model.currentQuestionLifetime * 1000
                : Date.now() + questions[model.currentQuestionIndex].lifetimeSeconds * 1000
            }
            format="s"
            onFinish={handleCountdownFinished}
          />
          {model.currentAnswer === -1 ?
            <div className="flex flex-row flex-wrap gap-2 w-4/5 lg:w-3/5 justify-center">
              {questions[model.currentQuestionIndex].options.map((option, index) => (
                <Button
                key={index}
                onClick={() => handleOptionClicked(option.text, index)}
                disabled={model.currentAnswer !== -1}
                >
                  {option.text}
                </Button>
              ))}
            </div>
            : <p className="font-sans text-lg text-ellipsis text-center">Current Selection: {currentSelection}</p>
          }
        </div>
      )}
    </div>
  )
})

export default Page
