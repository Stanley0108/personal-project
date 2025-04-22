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
  },
  {
    question: "Which country is known for the Eiffel Tower?",
    options: ["Germany", "Italy", "France", "Spain"],
    answer: "France"
  },
  {
    question: "What is the official language of Portugal?",
    options: ["Spanish", "Portuguese", "French", "Italian"],
    answer: "Portuguese"
  },
  {
    question: "Which country has the most islands in the world?",
    options: ["Canada", "Sweden", "Finland", "Norway"],
    answer: "Sweden"
  },
  {
    question: "What is the largest city in Russia?",
    options: ["Saint Petersburg", "Novosibirsk", "Moscow", "Vladivostok"],
    answer: "Moscow"
  },
  {
    question: "Which of these countries is landlocked?",
    options: ["Italy", "Hungary", "France", "Portugal"],
    answer: "Hungary"
  },
  {
    question: "Which country is famous for its windmills and tulips?",
    options: ["Belgium", "Netherlands", "Germany", "Denmark"],
    answer: "Netherlands"
  },
  {
    question: "Which is the largest island in Europe?",
    options: ["Great Britain", "Iceland", "Sicily", "Corsica"],
    answer: "Great Britain"
  },
  {
    question: "What is the official language of Switzerland?",
    options: ["German", "French", "Italian", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which country is known as the Land of the Midnight Sun?",
    options: ["Finland", "Norway", "Sweden", "Iceland"],
    answer: "Norway"
  },
  {
    question: "Which European country has the most UNESCO World Heritage Sites?",
    options: ["Italy", "France", "Germany", "Spain"],
    answer: "Italy"
  }
];

let currentPage = 0;
let score = 0;

function renderQuestions() {
  const questionContainer = document.getElementById('quiz-container');
  questionContainer.innerHTML = ''; // Clear previous content
  
  if (currentPage >= allQuestions.length) {
    questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / 100</p>`;
    document.getElementById('submit-btn').style.display = 'none'; // Hide submit button after quiz is done
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
    score += 20; // Each correct answer is worth 20 points
  }

  currentPage++;
  renderQuestions(); // Move to the next question
}

function changePage(direction) {
  if (currentPage + direction >= 0 && currentPage + direction < allQuestions.length) {
    currentPage += direction;
    renderQuestions();
  }
}

function submitQuiz() {
  alert(`Quiz Submitted! Your final score is: ${score} / 100`);
  score = 0;  // Reset score after submission
  currentPage = 0;  // Restart the quiz
  renderQuestions();  // Restart the quiz view
}

window.onload = () => {
  renderQuestions(); // Start the quiz
};