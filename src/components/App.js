import { useState } from "react";
import QuizSetup from "./QuizSetup";
import QuizQuestion from "./QuizQuestion";
import QuizSummary from "./QuizSummary";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [view, setView] = useState("QuizSetup");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSetView(view) {
    setView(view);
  }

  function handleSetQuestions(questions) {
    setQuestions(questions);
  }

  function handleSetAnswers(answer) {
    setAnswers((currAnswers) => [...currAnswers, answer]);
  }

  function handleSetFinalScore() {
    setFinalScore((currScore) => currScore + 1);
  }

  function handleSetIsLoading(bool) {
    setIsLoading(bool);
  }

  function handleSetError(errorMessage) {
    setError(errorMessage);
  }

  function handleNextQueston() {
    setCurrQuestion((curQuestionIndex) => curQuestionIndex + 1);
  }

  function handleReturnHome() {
    setView("QuizSetup");
    setQuestions([]);
    setAnswers([]);
    setFinalScore(0);
    setCurrQuestion(0);
  }

  function handlePlayAgain() {
    setView("QuizQuestion");
    setQuestions((currQuestions) => shuffleArray(currQuestions));
    setAnswers([]);
    setFinalScore(0);
    setCurrQuestion(0);
  }

  return (
    <div className="app">
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorComponent error={error} />}
      {!isLoading && !error && (
        <>
          <header
            className={`app-header ${
              view === "QuizQuestion" ? "hidden" : null
            }`}
          >
            <h1>QuizNova</h1>
          </header>
          {view === "QuizSetup" && (
            <QuizSetup
              onSetView={handleSetView}
              onSetQuestions={handleSetQuestions}
              onSetIsLoading={handleSetIsLoading}
              onSetError={handleSetError}
            />
          )}
          {view === "QuizQuestion" && (
            <QuizQuestion
              key={questions.at(currQuestion).question}
              questions={questions}
              finalScore={finalScore}
              onSetFinalScore={handleSetFinalScore}
              currQuestion={currQuestion}
              onNextQuestion={handleNextQueston}
              onSetView={handleSetView}
              onSetAnswer={handleSetAnswers}
            />
          )}
          {view === "QuizSummary" && (
            <QuizSummary
              questions={questions}
              finalScore={finalScore}
              answers={answers}
              onReturnHome={handleReturnHome}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </>
      )}
    </div>
  );
}

function Loader() {
  return <h1 className="loader">⌛Loading...⌛</h1>;
}

function ErrorComponent({ error }) {
  return <h1 className="error">{error}</h1>;
}
