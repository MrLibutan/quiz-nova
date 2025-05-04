import { useState } from "react";
import QuizSetup from "./QuizSetup";
import QuizQuestion from "./QuizQuestion";

export default function App() {
  const [view, setView] = useState("QuizSetup");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSetView(view) {
    setView(view);
  }

  function handleSetQuestions(questions) {
    setQuestions(questions);
  }

  function handleSetIsLoading(bool) {
    setIsLoading(bool);
  }

  function handleSetError(errorMessage) {
    setError(errorMessage);
  }

  return (
    <div className="app">
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorComponent error={error} />}
      {!isLoading && !error && (
        <>
          <header
            className={`app-header ${view !== "QuizSetup" ? "hidden" : null}`}
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
          {view === "QuizQuestion" && <QuizQuestion questions={questions} />}
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
