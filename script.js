let allQuestions = [
  // Your quiz questions go here...
];

let currentPage = 0;
let score = 0;
let totalQuestions = allQuestions.length;

// Initialize the globe
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

function renderQuestions() {
  // Add code to render your quiz questions dynamically here.
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalQuestions) currentPage = totalQuestions - 1;

  renderQuestions(); // Render the questions for the new page
}

function submitQuiz() {
  // Logic to calculate score here
  alert(`Your score is: ${score}`);
}

window.onload = () => {
  initGlobe(); // Initialize the globe on page load
  renderQuestions(); // Initialize the quiz questions
};