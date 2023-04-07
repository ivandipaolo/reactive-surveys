import Image from "next/image";
import { useEffect, useState } from "react";
import ImageNotFound from '@/public/not-found.png'
import { Statistic } from "antd";

type Option = {
  text: string;
};

type Question = {
  text: string;
  image?: string;
  lifetimeSeconds: number;
  options: Option[];
};

type QuestionList = Question[];

interface SurveyQuestionsProps {
  questions: QuestionList;
}

const SurveyQuestions = ({questions}: SurveyQuestionsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[currentQuestionIndex])
  const totalQuestions = questions.length
  const { Countdown } = Statistic

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        clearInterval(interval)
      }
    }, currentQuestion.lifetimeSeconds * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [currentQuestionIndex])

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex])
  }, [currentQuestionIndex])

  if (currentQuestionIndex === totalQuestions - 1 && Date.now() > (currentQuestion.lifetimeSeconds * 1000)) {
    return <p>The survey is finished.</p>;
  }

  return (
    <div>
      <Image src={currentQuestion.image ?? ImageNotFound} alt='questionImage' width={250} height={100}/>
      <Countdown value={Date.now() + currentQuestion.lifetimeSeconds * 1000} format="ss"/>
    </div>
  )
}

export default SurveyQuestions
