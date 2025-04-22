let allQuestions = [
  {
    question: "What is the capital of Russia?",
    options: ["Moscow", "Saint Petersburg", "Kiev", "Warsaw"],
    answer: "Moscow"
  },
  {
    question: "Which country is known as the 'Land of the Midnight Sun'?",
    options: ["Norway", "Russia", "Finland", "Sweden"],
    answer: "Norway"
  },
  {
    question: "What is the longest river in Europe?",
    options: ["Volga", "Danube", "Rhine", "Elbe"],
    answer: "Volga"
  },
  {
    question: "Which of the following is a Baltic state?",
    options: ["Estonia", "Poland", "Norway", "Ireland"],
    answer: "Estonia"
  },
  {
    question: "Which mountain range separates Europe from Asia?",
    options: ["Ural Mountains", "Carpathians", "Alps", "Pyrenees"],
    answer: "Ural Mountains"
  }
];

let currentPage = 0;

function renderQuestions() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = '';

  const currentQuestion = allQuestions[currentPage];
  
  const questionText = document.createElement('div');
  questionText.classList.add('quiz-question');
  questionText.textContent = currentQuestion.question;
  
  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('quiz-options');
  
  currentQuestion.options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.onclick = () => checkAnswer(option, currentQuestion.answer);
    optionsContainer.appendChild(optionButton);
  });

  quizContainer.appendChild(questionText);
  quizContainer.appendChild(optionsContainer);
}

function checkAnswer(selected, correctAnswer) {
  if (selected === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Wrong answer. Try again!");
  }

  changePage(1); // Move to the next question
}

function changePage(direction) {
  currentPage += direction;

  if (currentPage < 0) currentPage = 0;
  if (currentPage >= allQuestions.length) currentPage = allQuestions.length - 1;

  renderQuestions(); // Re-render the current question
}

function initGlobe() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("globe-container").appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(5, 50, 50);
  const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/raulnabet/earth-texture/master/earth_texture.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  const light = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(light);

  camera.position.z = 15;

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

window.onload = () => {
  initGlobe(); // Initialize the globe on page load
  renderQuestions(); // Initialize the quiz questions
};