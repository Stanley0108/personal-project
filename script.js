let allQuestions = [
  // Easy
  { difficulty: "easy", question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { difficulty: "easy", question: "What is the currency used by most European Union countries?", options: ["Euro", "Dollar", "Pound", "Franc"], answer: "Euro" },
  { difficulty: "easy", question: "What is the capital of Germany?", options: ["Berlin", "Munich", "Hamburg", "Frankfurt"], answer: "Berlin" },
  { difficulty: "easy", question: "What is the capital of Spain?", options: ["Madrid", "Barcelona", "Seville", "Valencia"], answer: "Madrid" },
  { difficulty: "easy", question: "Which country is famous for tulips and windmills?", options: ["Netherlands", "Belgium", "Germany", "Austria"], answer: "Netherlands" },
  { difficulty: "easy", question: "Which river runs through Budapest?", options: ["Danube", "Volga", "Rhine", "Elbe"], answer: "Danube" },
  { difficulty: "easy", question: "Which country shares the longest border with Russia?", options: ["Kazakhstan", "China", "Ukraine", "Mongolia"], answer: "Kazakhstan" },

  // Intermediate
  { difficulty: "intermediate", question: "Which exclave belongs to Russia between Poland and Lithuania?", options: ["Kaliningrad", "Kazan", "Vladivostok", "Yekaterinburg"], answer: "Kaliningrad" },
  { difficulty: "intermediate", question: "Which country left the European Union in 2020?", options: ["United Kingdom", "Norway", "Switzerland", "Turkey"], answer: "United Kingdom" },
  { difficulty: "intermediate", question: "Which European country is known for the fjords?", options: ["Norway", "Sweden", "Finland", "Denmark"], answer: "Norway" },
  { difficulty: "intermediate", question: "Which river flows through Paris?", options: ["Seine", "Thames", "Rhine", "Loire"], answer: "Seine" },
  { difficulty: "intermediate", question: "Which European country is divided into cantons?", options: ["Switzerland", "Austria", "Belgium", "Czech Republic"], answer: "Switzerland" },
  { difficulty: "intermediate", question: "What is the capital of Ukraine?", options: ["Kyiv", "Odessa", "Lviv", "Kharkiv"], answer: "Kyiv" },
  { difficulty: "intermediate", question: "Which Russian city hosted the 2014 Winter Olympics?", options: ["Sochi", "Moscow", "St. Petersburg", "Kazan"], answer: "Sochi" },

  // Hard
  { difficulty: "hard", question: "What mountain range separates Europe and Asia?", options: ["Ural Mountains", "Alps", "Caucasus", "Carpathians"], answer: "Ural Mountains" },
  { difficulty: "hard", question: "Which Russian lake is the deepest in the world?", options: ["Lake Baikal", "Caspian Sea", "Lake Ladoga", "Lake Onega"], answer: "Lake Baikal" },
  { difficulty: "hard", question: "Which Russian republic is known for its volatile history and conflicts?", options: ["Chechnya", "Tatarstan", "Dagestan", "Buryatia"], answer: "Chechnya" },
  { difficulty: "hard", question: "What is the highest peak in Europe?", options: ["Mount Elbrus", "Mont Blanc", "Matterhorn", "Grossglockner"], answer: "Mount Elbrus" },
  { difficulty: "hard", question: "Which river forms the border between Romania and Bulgaria?", options: ["Danube", "Tisza", "Dniester", "Volga"], answer: "Danube" },
  { difficulty: "hard", question: "Which region of Russia is known for extreme cold and permafrost?", options: ["Siberia", "Caucasus", "Kaliningrad", "Ural"], answer: "Siberia" },
  { difficulty: "hard", question: "What is the northernmost capital in mainland Europe?", options: ["Helsinki", "Oslo", "Stockholm", "Reykjavik"], answer: "Helsinki" },
  { difficulty: "hard", question: "Which sea separates the Balkans from Italy?", options: ["Adriatic Sea", "Aegean Sea", "Baltic Sea", "Black Sea"], answer: "Adriatic Sea" }
];

let currentPage = 0;
const QUESTIONS_PER_PAGE = 5;
let userAnswers = {};

function renderQuestions() {
  const quizWrapper = document.getElementById("quiz-wrapper");
  const filter = document.getElementById("difficulty-filter").value;
  let filtered = allQuestions;
  if (filter !== "all") filtered = allQuestions.filter(q => q.difficulty === filter);

  const start = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = filtered.slice(start, start + QUESTIONS_PER_PAGE);
  quizWrapper.innerHTML = "";

  pageQuestions.forEach((q, i) => {
    const globalIndex = allQuestions.indexOf(q);
    const qEl = document.createElement("div");
    qEl.className = "quiz-question";
    qEl.innerHTML = `<p>${globalIndex + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${globalIndex}" value="${opt}" ${userAnswers[`q${globalIndex}`] === opt ? "checked" : ""}> ${opt}
        </label>`).join("")}`;
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
  const filter = document.getElementById("difficulty-filter").value;
  allQuestions.forEach((q, i) => {
    if (filter === "all" || q.difficulty === filter) {
      total++;
      if (userAnswers[`q${i}`] === q.answer) score++;
    }
  });
  document.getElementById("score-display").textContent = `You scored ${score} out of ${total}!`;
}

function restartQuiz() {
  currentPage = 0;
  userAnswers = {};
  renderQuestions();
  document.getElementById("score-display").textContent = "";
}

function changeBackground() {
  const color = document.getElementById("bg-picker").value;
  document.body.style.background = color;
}

document.getElementById("difficulty-filter").addEventListener("change", () => {
  currentPage = 0;
  renderQuestions();
});

window.onload = () => {
  renderQuestions();
};