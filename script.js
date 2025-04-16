const quizData = [
    // Hard
    { question: "Kaliningrad is an exclave of which country?", options: ["Poland", "Russia", "Germany", "Lithuania"], answer: "Russia" },
    { question: "Which mountain range separates Europe and Asia in Russia?", options: ["Carpathians", "Alps", "Urals", "Caucasus"], answer: "Urals" },
    { question: "What is the name of the Russian region known for permafrost and extreme cold?", options: ["Siberia", "Ural", "Chechnya", "Karelia"], answer: "Siberia" },
    { question: "Which is the largest lake in Europe, located in Russia?", options: ["Lake Baikal", "Lake Ladoga", "Lake Onega", "Caspian Sea"], answer: "Lake Ladoga" },
    { question: "Which sea borders both Europe and Russia?", options: ["Baltic Sea", "Black Sea", "Barents Sea", "All of them"], answer: "All of them" },
    { question: "Which Russian city is known as the cultural capital?", options: ["Moscow", "St. Petersburg", "Yekaterinburg", "Sochi"], answer: "St. Petersburg" },
    { question: "In which country is the city of Sarajevo located?", options: ["Croatia", "Serbia", "Bosnia and Herzegovina", "Montenegro"], answer: "Bosnia and Herzegovina" },
    { question: "Which European country uses the lek as its currency?", options: ["Serbia", "Albania", "Bulgaria", "North Macedonia"], answer: "Albania" },
    { question: "What is the smallest country in Europe by area?", options: ["San Marino", "Liechtenstein", "Vatican City", "Monaco"], answer: "Vatican City" },
    { question: "Which Russian city hosted the 2014 Winter Olympics?", options: ["Moscow", "Sochi", "Kazan", "Novosibirsk"], answer: "Sochi" },
  
    // Easy
    { question: "What is the capital of Russia?", options: ["St. Petersburg", "Moscow", "Kazan", "Novosibirsk"], answer: "Moscow" },
    { question: "Which country is shaped like a boot?", options: ["Spain", "Greece", "Italy", "Croatia"], answer: "Italy" },
    { question: "Which continent is Europe part of?", options: ["Eurasia", "Asia", "Africa", "America"], answer: "Eurasia" },
    { question: "Which country is west of Germany?", options: ["Poland", "Austria", "France", "Czech Republic"], answer: "France" },
    { question: "Which country has London as its capital?", options: ["France", "United Kingdom", "Ireland", "Scotland"], answer: "United Kingdom" },
    { question: "Which country is famous for its fjords?", options: ["Sweden", "Norway", "Finland", "Denmark"], answer: "Norway" },
    { question: "What is the currency of most European Union countries?", options: ["Dollar", "Pound", "Euro", "Franc"], answer: "Euro" },
    { question: "Which city is the capital of France?", options: ["Paris", "Nice", "Lyon", "Marseille"], answer: "Paris" },
    { question: "Which country shares borders with Russia and has a capital named Minsk?", options: ["Ukraine", "Estonia", "Belarus", "Latvia"], answer: "Belarus" },
    { question: "Which sea is located south of Ukraine?", options: ["Baltic Sea", "Barents Sea", "Black Sea", "North Sea"], answer: "Black Sea" },
  
    // Intermediate
    { question: "Which river flows through Budapest?", options: ["Danube", "Volga", "Thames", "Seine"], answer: "Danube" },
    { question: "Which country is famous for tulips and windmills?", options: ["Belgium", "Netherlands", "France", "Austria"], answer: "Netherlands" },
    { question: "Which country has the most volcanoes in mainland Europe?", options: ["France", "Iceland", "Italy", "Russia"], answer: "Italy" },
    { question: "Which country borders both the Atlantic Ocean and the Mediterranean Sea?", options: ["Italy", "Portugal", "Spain", "Greece"], answer: "Spain" },
    { question: "Which is the longest river in Europe?", options: ["Danube", "Volga", "Rhine", "Dnieper"], answer: "Volga" }
  ];
  
  function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    quizData.forEach((q, index) => {
      const questionEl = document.createElement("div");
      questionEl.classList.add("quiz-question");
      questionEl.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        ${q.options.map(opt => `
          <label>
            <input type="radio" name="q${index}" value="${opt}"> ${opt}
          </label>`).join("")}
      `;
      quizContainer.appendChild(questionEl);
    });
  }
  
  function submitQuiz() {
    let score = 0;
    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });
    const resultEl = document.getElementById("quiz-result");
    resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
    resultEl.style.color = score >= quizData.length / 2 ? "green" : "red";
  }
  
  window.onload = loadQuiz;