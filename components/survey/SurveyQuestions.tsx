import Image from "next/image"
import { useState } from "react"
import ImageNotFound from "@/public/not-found.png"
import { Statistic, Button } from "antd"
import { useQuizContract } from "@/hooks/useQuizContract"

type Option = {
  text: string
}

type Question = {
  text: string
  image?: string
  lifetimeSeconds: number
  options: Option[]
}

type QuestionList = Question[]

interface SurveyQuestionsProps {
  questions: QuestionList
}

const SurveyQuestions = ({ questions }: SurveyQuestionsProps) => {
  const { setCooldown, submitSurvey } = useQuizContract();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[currentQuestionIndex]
  )
  const [isSurveyFinished, setIsSurveyFinished] = useState<boolean>(false)
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1)
  const { Countdown } = Statistic

  const handleCountdownFinished = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(newIndex)
      setCurrentQuestion(questions[newIndex])
      setCurrentAnswer(-1)
    } else {
      setIsSurveyFinished(true)
      finishedSurvey()
    }
  }
  

  const handleOptionClicked = (index: number) => {
      setSurveyAnswers([...surveyAnswers, index])
      setCurrentAnswer(index)
  }

  const finishedSurvey = () => {
    submitSurvey(1, surveyAnswers)
    setCooldown(15)
  }

  return (
    <div>
      {isSurveyFinished ? (
        <>
          <p>The survey is finished.</p>
          <p>Thank you for participating today</p>
        </>
      ) : (
        <>
          <Image
            src={currentQuestion.image ?? ImageNotFound}
            alt="questionImage"
            width={250}
            height={100}
          />
          <Countdown
            value={Date.now() + currentQuestion.lifetimeSeconds * 1000}
            format="ss"
            onFinish={handleCountdownFinished}
          />
          <div>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClicked(index)}
                disabled={currentAnswer !== -1}
              >
                {option.text}
              </Button>
            ))}
          </div>
          <p>Current answer: {currentAnswer === -1 ? "N/A" : currentAnswer + 1}</p>
        </>
      )}
    </div>
  )
}

export default SurveyQuestions
