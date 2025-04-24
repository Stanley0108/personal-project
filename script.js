let allQuestions = [
  {
    question: "What is the capital of Russia?",
    options: ["Moscow", "Saint Petersburg", "Kiev", "Warsaw"],
    answer: "Moscow"
  },
  {
    question: "Which country is the largest in Europe by land area?",
    options: ["Ukraine", "Russia", "Germany", "France"],
    answer: "Russia"
  },
  {
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Pound Sterling", "Franc", "Dollar"],
    answer: "Pound Sterling"
  },
  {
    question: "Which of the following countries is part of both Europe and Asia?",
    options: ["Turkey", "Australia", "Brazil", "Canada"],
    answer: "Turkey"
  },
  {
    question: "Which city is known as the 'Eternal City'?",
    options: ["Rome", "Paris", "London", "Athens"],
    answer: "Rome"
  },
  {
    question: "Which is the smallest country in Europe?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    answer: "Vatican City"
  },
  {
    question: "What is the longest river in Europe?",
    options: ["Danube", "Volga", "Rhine", "Po"],
    answer: "Volga"
  },
  {
    question: "Which country has the most official languages?",
    options: ["Switzerland", "Belgium", "Canada", "India"],
    answer: "Switzerland"
  },
  {
    question: "What is the largest country in Europe by population?",
    options: ["Germany", "Russia", "France", "Italy"],
    answer: "Russia"
  },
  {
    question: "Which mountain range separates Europe and Asia?",
    options: ["Himalayas", "Alps", "Ural Mountains", "Pyrenees"],
    answer: "Ural Mountains"
  }
];

let currentPage = 0;
let score = 0;

function renderQuestions() {
  const questionContainer = document.getElementById('quiz-container');
  questionContainer.innerHTML = '';
  
  if (currentPage >= allQuestions.length) {
    questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / ${allQuestions.length * 20}</p>`;
    document.getElementById('submit-btn').style.display = 'none';
    return;
  }

  const questionData = allQuestions[currentPage];
  const questionElement = document.createElement('div');
  questionElement.classList.add('quiz-question');
  questionElement.innerHTML = `
    <h2>${questionData.question}</h2>
    <div class="quiz-options">
      ${questionData.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('')}
    </div>
  `;
  questionContainer.appendChild(questionElement);
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = allQuestions[currentPage].answer;
  if (selectedAnswer === correctAnswer) {
    score += 20;
    document.getElementById('score').textContent = `Score: ${score}`;
  }
  currentPage++;
  renderQuestions();
}

function changePage(direction) {
  if (currentPage + direction >= 0 && currentPage + direction < allQuestions.length) {
    currentPage += direction;
    renderQuestions();
  }
}

function submitQuiz() {
  alert(`Quiz Submitted! Your final score is: ${score} / ${allQuestions.length * 20}`);
  score = 0;
  currentPage = 0;
  renderQuestions();
}

window.onload = () => {
  renderQuestions();
  window.addEventListener('resize', () => {
    document.body.style.fontSize = window.innerWidth < 500 ? '14px' : '16px';
  });
};