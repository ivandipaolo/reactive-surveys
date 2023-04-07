import { useState } from "react"
import ImageNotFound from "@/public/not-found.png"
import { Statistic, Button, Image} from "antd"
import { useQuizContract } from "@/hooks/useQuizContract"

type SurveyAnswer = {
  answerText: string,
  answerIndex: number
}

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
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1)
  const [currentQuestionLifetime, setCurrentQuestionLifetime] = useState<number>(currentQuestion.lifetimeSeconds)
  const { Countdown } = Statistic

  const handleCountdownFinished = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(newIndex)
      setCurrentQuestion(questions[newIndex])
      setCurrentQuestionLifetime(currentQuestion.lifetimeSeconds)
      setCurrentAnswer(-1)
    } else {
      setIsSurveyFinished(true)
    }
  }
  

  const handleOptionClicked = (value:string, index: number) => {
      setSurveyAnswers([...surveyAnswers, {answerText: value, answerIndex: index}])
      setCurrentAnswer(index)
      setCurrentQuestionLifetime(4)
  }

  const finishedSurvey = () => {
    submitSurvey(1, surveyAnswers.map((answer) => (answer.answerIndex)))
    setCooldown(15)
  }

  return (
    <div>
      {isSurveyFinished ? (
        <>
          {
            surveyAnswers.map((answer, index) => (
              <div key="answer">
                <p>{questions[index].text}</p>
                <p>
                  {answer.answerText}
                </p>
              </div>
            ))
          }
          <Button type="default" onClick={finishedSurvey}>
            Submit Answers
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-md"
            src={currentQuestion.image}
            alt="questionImage"
            width={350}
            height={230}
          />
          <p>{currentQuestion.text}</p>
          {
            currentAnswer !== -1 && <p>Displaying next question in: </p>
          }
          <Countdown
            value={currentAnswer !== -1 ? Date.now() + currentQuestionLifetime * 1000 : Date.now() + currentQuestion.lifetimeSeconds * 1000}
            format="ss"
            onChange={(value) => console.log(Number(value))}
            onFinish={handleCountdownFinished}
          />
          <div className="flex flex-row gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClicked(option.text, index)}
                disabled={currentAnswer !== -1}
              >
                {option.text}
              </Button>
            ))}
          </div>
          <p>Current answer: {currentAnswer === -1 ? "N/A" : currentAnswer + 1}</p>
        </div>
      )}
    </div>
  )
}

export default SurveyQuestions
