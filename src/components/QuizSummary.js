export default function QuizSummary({
  questions,
  finalScore,
  answers,
  onReturnHome,
  onPlayAgain,
}) {
  return (
    <section className="quiz-summary">
      <p className="final-score">
        You scored <strong>{finalScore}</strong> out of {questions.length}
      </p>
      <ul className="summary-list">
        {questions.map((question, i) => (
          <li
            key={question.question}
            className={`summary-item ${
              question.correct_answer === answers.at(i)
                ? "correct"
                : "incorrect"
            }`}
          >
            <p className="question">
              Q{i + 1}: {question.question}
            </p>
            <p className="answer">
              <strong>Your Answer:</strong> {answers.at(i)}
            </p>
            {question.correct_answer !== answers.at(i) && (
              <p className="correct-answer">
                <strong>Correct Answer:</strong> {question.correct_answer}
              </p>
            )}
          </li>
        ))}
      </ul>
      <button className="btn return-home" onClick={onReturnHome}>
        Return Home
      </button>
      <button className="btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </section>
  );
}
