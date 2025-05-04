export default function QuizQuestion() {
  return (
    <section className="quiz-question">
      <div className="question-header">
        <p className="question-number">
          <strong>Question 1</strong> of 5
        </p>
        <p className="score">✅ Score: 0</p>
      </div>
      <h4 className="question">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti et
        explicabo aliquam unde nam voluptate est tempora provident
      </h4>
      <div className="choices">
        <div className="choice selected">Berlin</div>
        <div className="choice">Madrid</div>
        <div className="choice">Paris</div>
        <div className="choice">Rome</div>
      </div>
      <button className="btn">Next Question</button>
    </section>
  );
}
