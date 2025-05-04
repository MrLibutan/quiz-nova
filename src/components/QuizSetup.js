import { useRef, useState } from "react";

const numberOfQuestions = [5, 10, 15, 20];

const categories = [
  { id: 0, name: "Any Category" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

const difficulties = ["Any Difficulty", "Easy", "Medium", "Hard"];

export default function QuizSetup({
  onSetView,
  onSetQuestions,
  onSetIsLoading,
  onSetError,
}) {
  const [numQuestions, setNumQuestions] = useState("5");
  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("any difficulty");
  const abortControllerRef = useRef(null);

  async function handleStartQuiz() {
    // abort any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // start loading and reset error state
    onSetIsLoading(true);
    onSetError("");
    try {
      // fetch questions from api
      const questionRes = await fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}${
          category ? `&category=${category}` : ""
        }${difficulty !== "any difficulty" ? `&difficulty=${difficulty}` : ""}`
      );
      // check if request was successful
      if (!questionRes.ok)
        throw new Error(
          "Failed to fetch questions. Please check your connection or try again later."
        );
      // parse the response
      const questions = await questionRes.json();
      if (questions.response_code !== 0)
        throw new Error(
          "Failed to fetch trivia questions. Please try a different category or difficulty."
        );
      // set questions
      onSetQuestions(questions.results);
      console.log(questions);
    } catch (err) {
      console.error(err.message);
      onSetError(err.message);
    } finally {
      // change view and set loading to false
      onSetIsLoading(false);
      onSetView("QuizQuestion");
    }
  }

  return (
    <section className="quiz-setup">
      <h3>➡️ Setup Your Quiz ⬅️</h3>
      <InputSection>
        <label>Number of Questions</label>
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        >
          {numberOfQuestions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </InputSection>
      <InputSection>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </InputSection>
      <InputSection>
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {difficulties.map((difficulty) => (
            <option
              key={difficulty.toLowerCase()}
              value={difficulty.toLowerCase()}
            >
              {difficulty}
            </option>
          ))}
        </select>
      </InputSection>
      <button className="btn" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </section>
  );
}

function InputSection({ children }) {
  return <div className="input-section">{children}</div>;
}
