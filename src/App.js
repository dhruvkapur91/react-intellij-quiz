import { useState } from 'react';
import './App.css';
import Select from "react-select";

const rectangleQuestions = [
  {
    questionType: 'multiple-correct-choices',
    questionText: <span>Which of the following are <b>valid properties</b> of Rectangle?</span>,
    answerOptions: [
      { answerText: 'Length', isCorrect: true },
      { answerText: 'Breadth', isCorrect: true },
      { answerText: 'Area', isCorrect: false },
      { answerText: 'Perimeter', isCorrect: false },
      { answerText: 'Color', isCorrect: 'maybe' },
    ]
  },
  {
    questionType: 'multiple-correct-choices',
    questionText: <span>Which of the following are <b>valid behaviors</b> of Rectangle?</span>,
    answerOptions: [
      { answerText: 'Length', isCorrect: false },
      { answerText: 'Breadth', isCorrect: false },
      { answerText: 'Area', isCorrect: true },
      { answerText: 'Perimeter', isCorrect: true },
      { answerText: 'Color', isCorrect: false },
    ]
  },
  {
    questionType: 'single-correct-choice',
    questionText: <span>How does one model <b>behaviors</b> in Java?</span>,
    answerOptions: [
      { answerText: 'By using static properties', isCorrect: false },
      { answerText: 'By using public final fields', isCorrect: false },
      { answerText: 'By using private fields', isCorrect: false },
      { answerText: 'By using private methods', isCorrect: false },
      { answerText: 'By using public methods', isCorrect: true },
      { answerText: 'By using constructor', isCorrect: false },
    ]
  },
  {
    questionType: 'single-correct-choice',
    questionText: <span>How does one model <b>properties</b> in Java?</span>,
    answerOptions: [
      { answerText: 'By using static properties', isCorrect: false },
      { answerText: 'By using public final fields', isCorrect: false },
      { answerText: 'By using private fields', isCorrect: true },
      { answerText: 'By using private methods', isCorrect: false },
      { answerText: 'By using public methods', isCorrect: false },
      { answerText: 'By using constructor', isCorrect: false },
    ]
  }
]

const questions = [
  {
    questionType: 'single-choice',
    questionText: 'Select the right shortcut to rename a variable',
    answerOptions: [
      { value: "SHIFT F6", label: "SHIFT F6", isCorrect: true },
      { value: "CMD SHIFT F6", label: "CMD SHIFT F6", isCorrect: false },
      { value: "OPTION ENTER", label: "OPTION ENTER", isCorrect: false }
    ]
  },
  {
    questionType: 'single-choice',
    questionText: "How can you switch between a source and test implementation?",
    answerOptions: [
      { value: "CMD F6", label: "CMD F6", isCorrect: false },
      { value: "CMD SHIFT T", label: "CMD SHIFT T", isCorrect: true },
      { value: "OPTION SHIFT T", label: "OPTION SHIFT T", isCorrect: false },
      { value: "SHIFT T", label: "SHIFT T", isCorrect: false },
      { value: "DOUBLE TAP T", label: "DOUBLE TAP T", isCorrect: false }
    ]
  }
]

function SuccessMessage({score}) {
  return (
    <div className="success">
      Woah! All Done. You scored {score} points on this! You're on your journey to be a better designer!
    </div>
  )
}

const QuestionSection = ({ counter }) => {
  const questionDisplayCount = counter + 1;
  const questionText = questions[counter].questionText;

  return (
    <div className="question-section">
      <div className="question-count">
        Question <span className="question-current-count">{questionDisplayCount}</span> out of <span className="question-total-count">{questions.length}</span>
      </div>
      <div className="question-text">{questionText}</div>
    </div>
  )
}

function AnswerSection({ counter, questionFinishedHandler }) {
  const answerOptions = questions[counter].answerOptions;

  const [score,setScore] = useState(0);
  const [shouldReAttempt,setShouldReAttempt] = useState(false);

  const questionIncorrectlyAnswered = () => {
      setShouldReAttempt(true);
      setScore(score - 1);
  }

  const questionCorrectlyAnswered = () => {
      setShouldReAttempt(false);
      questionFinishedHandler(score+1)
  }

  const answerChangedHandler = ({value, isCorrect}) => {
    isCorrect ? questionCorrectlyAnswered() : questionIncorrectlyAnswered();
  }

  return (
    <div className="answer-section">
      <Select options={answerOptions} onChange={answerChangedHandler} isMulti />
      { shouldReAttempt ? <span>Oops, that's not the right answer. Try again.</span> : "" }
    </div>
  )
}

function Quiz({ quizFinishedHandler }) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [score,setScore] = useState(0);

  const questionFinishedHandler = (questionsScore) => {
    const nextQuestionNumber = currentQuestionNumber + 1;
    setScore(score + questionsScore)
    if (nextQuestionNumber < questions.length) {
      setCurrentQuestionNumber(nextQuestionNumber)
    } else {
      quizFinishedHandler(score);
    }
  }

  return (
    <>
      <QuestionSection counter={currentQuestionNumber} />
      <AnswerSection counter={currentQuestionNumber} questionFinishedHandler={questionFinishedHandler} />
    </>
  )
}

function App() {

  const [isQuizFinished,setQuizFinished] = useState(false);
  const [score,setScore] = useState(0);

  const quizFinishedHandler = (quizScore) => {
    setQuizFinished(true)
    setScore(quizScore)
  }

  return (
    <div className="App">
      { isQuizFinished ? <SuccessMessage score={score} /> : <Quiz quizFinishedHandler={quizFinishedHandler} />}
    </div>
  );
}

export default App;
