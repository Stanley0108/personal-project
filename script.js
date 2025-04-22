let allQuestions = [
  { difficulty: "easy", question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { difficulty: "easy", question: "Which river runs through Budapest?", options: ["Danube", "Volga", "Rhine", "Elbe"], answer: "Danube" },
  { difficulty: "intermediate", question: "Which exclave belongs to Russia between Poland and Lithuania?", options: ["Kaliningrad", "Kazan", "Vladivostok", "Yekaterinburg"], answer: "Kaliningrad" },
  { difficulty: "hard", question: "What mountain range separates Europe and Asia?", options: ["Ural Mountains", "Alps", "Caucasus", "Carpathians"], answer: "Ural Mountains" },
  { difficulty: "easy", question: "What is the currency used by most European Union countries?", options: ["Euro", "Dollar", "Pound", "Franc"], answer: "Euro" },
  { difficulty: "intermediate", question: "Which country left the European Union in 2020?", options: ["United Kingdom", "Norway", "Switzerland", "Turkey"], answer: "United Kingdom" },
  { difficulty: "hard", question: "Which Russian lake is the deepest in the world?", options: ["Lake Baikal", "Caspian Sea", "Lake Ladoga", "Lake Onega"], answer: "Lake Baikal" },
  { difficulty: "easy", question: "What is the capital of Germany?", options: ["Berlin", "Munich", "Hamburg", "Frankfurt"], answer: "Berlin" },
  { difficulty: "intermediate", question: "Which European river is the longest?", options: ["Volga", "Danube", "Rhine", "Seine"], answer: "Volga" },
  { difficulty: "hard", question: "Which region of Russia is known for extreme cold and permafrost?", options: ["Siberia", "Caucasus", "Kaliningrad", "Ural"], answer: "Siberia" }
  // You can add more to reach 25+ total
];

let currentPage = 0;
const QUESTIONS_PER_PAGE = 5;
let userAnswers = {};

function renderQuestions() {
  const quizWrapper = document.getElementById("quiz-wrapper");
  const filter = document.getElementById("difficulty-filter").value;
  let filtered = allQuestions;
  if (filter !== "all") {
    filtered = allQuestions.filter(q => q.difficulty === filter);
  }

  const start = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = filtered.slice(start, start + QUESTIONS_PER_PAGE);
  quizWrapper.innerHTML = "";

  pageQuestions.forEach((q, i) => {
    const globalIndex = start + i;
    const qEl = document.createElement("div");
    qEl.className = "quiz-question";
    qEl.innerHTML = `<p>${globalIndex + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${globalIndex}" value="${opt}" ${userAnswers[`q${globalIndex}`] === opt ? "checked" : ""}> ${opt}
        </label>
      `).join("")}`;
    quizWrapper.appendChild(qEl);
  });

  document.getElementById("prev-btn").style.display = currentPage === 0 ? "none" : "inline-block";
  document.getElementById("next-btn").style.display = (start + QUESTIONS_PER_PAGE >= filtered.length) ? "none" : "inline-block";
  document.getElementById("submit-btn").style.display = (start + QUESTIONS_PER_PAGE >= filtered.length) ? "inline-block" : "none";
}

function changePage(delta) {
  saveAnswers();
  currentPage += delta;
  renderQuestions();
}

function saveAnswers() {
  const inputs = document.querySelectorAll("input[type='radio']:checked");
  inputs.forEach(input => {
    userAnswers[input.name] = input.value;
  });
}

function submitQuiz() {
  saveAnswers();
  let score = 0;
  let total = 0;
  allQuestions.forEach((q, i) => {
    if (document.getElementById("difficulty-filter").value === "all" || document.getElementById("difficulty-filter").value === q.difficulty) {
      total++;
      if (userAnswers[`q${i}`] === q.answer) {
        score++;
      }
    }
  });
  document.getElementById("score-display").textContent = `You scored ${score} out of ${total}!`;
  localStorage.setItem("lastScore", score);
}

function restartQuiz() {
  currentPage = 0;
  userAnswers = {};
  renderQuestions();
  document.getElementById("score-display").textContent = "";
}

document.getElementById("difficulty-filter").addEventListener("change", () => {
  currentPage = 0;
  renderQuestions();
});

window.onload = () => {
  renderQuestions();
  const saved = localStorage.getItem("lastScore");
  if (saved) {
    document.getElementById("score-display").textContent = `Last score: ${saved}`;
  }
};