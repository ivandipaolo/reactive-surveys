
export type QuestionList = Question[]

export type SurveyAnswer = {
  answerText: string
  answerIndex: number
}

export type Question = {
  text: string
  image: string
  lifetimeSeconds: number
  options: Option[]
}

export type Option = {
  text: string
}

export type Currency = {
  name: string
  symbol: string
  decimals: number
}

export type Network = {
  chainId: string
  chainName: string
  nativeCurrency: Currency
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export interface QuizContract {
  cooldownPeriodEnded: boolean
  balance: string
  setCooldown: (seconds: number) => Promise<void>
  submitSurvey: (surveyId: number, answerIds: number[]) => Promise<void>
  remainingTime: number
}