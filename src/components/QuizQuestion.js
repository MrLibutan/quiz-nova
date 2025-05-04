import { useRef, useState } from "react";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizQuestion({
  questions,
  finalScore,
  onSetFinalScore,
  currQuestion,
  onNextQuestion,
  onSetView,
  onSetAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const choices = useRef(
    shuffleArray([
      questions[currQuestion].correct_answer,
      ...questions[currQuestion].incorrect_answers,
    ])
  );

  function handleNextQuestion() {
    if (
      choices.current.at(selectedAnswer) ===
      questions[currQuestion].correct_answer
    ) {
      onSetFinalScore();
    }
    onSetAnswer(choices.current.at(selectedAnswer));
    if (currQuestion + 1 === questions.length) {
      onSetView("QuizSummary");
      return;
    }
    onNextQuestion();
  }

  return (
    <section className="quiz-question">
      <div className="question-header">
        <p className="question-number">
          <strong>Question {currQuestion + 1}</strong> of {questions.length}
        </p>
        <p className="score">✅ Score: {finalScore}</p>
      </div>
      <h4 className="current-question">
        {questions.at(currQuestion).question}
      </h4>
      <div className="choices">
        {choices.current.map((choice, i) => (
          <div
            className={`choice ${selectedAnswer === i ? "selected" : null}`}
            key={choice}
            onClick={() => setSelectedAnswer(selectedAnswer === i ? null : i)}
          >
            {choice}
          </div>
        ))}
      </div>
      <button
        className="btn"
        disabled={selectedAnswer === null}
        onClick={handleNextQuestion}
      >
        {currQuestion + 1 === questions.length
          ? "Finish Quiz"
          : "Next Question"}
      </button>
    </section>
  );
}
