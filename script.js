const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let time = 0;
let isPlaying = true;
let currentStage = 0;

const stages = [
  { name: 'Formation of Earth and Moon', desc: '4.6B years ago: Theia collides with Earth, forming the Moon.' },
  { name: 'Oceans and Atmosphere', desc: 'Volcanic outgassing creates the atmosphere; water condenses into oceans.' },
  { name: 'Origin of Life', desc: 'Primordial soup forms amino acids; life begins near deep-sea vents.' },
  { name: 'Complex Life', desc: 'Cambrian explosion: plants evolve, oxygen rises.' },
  { name: 'Continental Drift', desc: 'Pangea forms and splits into modern continents.' },
  { name: 'Ice Ages', desc: 'Glaciers cover Earth, CO₂ levels shift climate.' },
  { name: 'Asteroid Impact', desc: 'Chicxulub impact wipes out dinosaurs with dust clouds.' },
  { name: 'Volcanism', desc: 'Supervolcanoes erupt, blocking sunlight with ash.' },
  { name: 'Human Civilization', desc: 'Humans migrate from Africa, build cities.' },
  { name: 'Space Colonization', desc: 'Moon bases and Mars terraforming begin.' }
];

// Draw Earth
function drawEarth(x, y, radius, stage) {
  ctx.beginPath();
  let gradient;
  switch (stage) {
    case 0: // Molten Earth
      gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#ff4500');
      gradient.addColorStop(1, '#8b0000');
      break;
    case 1: // Oceans forming
      gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#00b7eb');
      gradient.addColorStop(1, '#00008b');
      break;
    default: // Life and beyond
      gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#32cd32');
      gradient.addColorStop(1, '#00b7eb');
  }
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background stars
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }

  const earthX = canvas.width / 2;
  const earthY = canvas.height / 2;
  const earthRadius = 50;

  // Update stage based on time (10 seconds per stage)
  if (isPlaying) time += 0.016; // ~60 FPS
  currentStage = Math.min(Math.floor(time / 10), stages.length - 1);
  document.getElementById('info-desc').textContent = stages[currentStage].desc;
  document.getElementById('stageSelect').value = currentStage;

  // Stage-specific visuals
  switch (currentStage) {
    case 0: // Formation of Earth and Moon
      drawEarth(earthX, earthY, earthRadius, 0);
      ctx.beginPath(); // Moon debris
      ctx.arc(earthX + Math.cos(time) * 80, earthY + Math.sin(time) * 80, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#a9a9a9';
      ctx.fill();
      break;
    case 1: // Oceans and Atmosphere
      drawEarth(earthX, earthY, earthRadius, 1);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height * (time % 10) / 10); // Atmosphere forming
      ctx.globalAlpha = 1;
      break;
    case 2: // Origin of Life
      drawEarth(earthX, earthY, earthRadius, 2);
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(earthX + Math.cos(i) * 40, earthY + Math.sin(i) * 40, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ff00ff'; // Microbes
        ctx.fill();
      }
      break;
    case 3: // Complex Life
      drawEarth(earthX, earthY, earthRadius, 3);
      ctx.fillStyle = '#32cd32';
      ctx.fillRect(earthX - 20, earthY - 20, 40, 40); // Plants
      break;
    case 4: // Continental Drift
      drawEarth(earthX, earthY, earthRadius, 4);
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(earthX - 60 + (time % 10) * 12, earthY - 20, 40, 40); // Moving continent
      break;
    case 5: // Ice Ages
      drawEarth(earthX, earthY, earthRadius, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(earthX - 60, earthY - 60, 120, 20); // Ice cap
      break;
    case 6: // Asteroid Impact
      drawEarth(earthX, earthY, earthRadius, 6);
      ctx.beginPath();
      ctx.arc(earthX + Math.cos(time) * 100, earthY + Math.sin(time) * 100, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4500'; // Asteroid
      ctx.fill();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Dust cloud
      ctx.globalAlpha = 1;
      break;
    case 7: // Volcanism
      drawEarth(earthX, earthY, earthRadius, 7);
      ctx.fillStyle = '#ff4500';
      ctx.fillRect(earthX - 10, earthY - 60, 20, 40); // Lava
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Ash
      ctx.globalAlpha = 1;
      break;
    case 8: // Human Civilization
      drawEarth(earthX, earthY, earthRadius, 8);
      ctx.fillStyle = '#ffff00';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(earthX + i * 20 - 40, earthY + i * 10 - 20, 10, 10); // Cities
      }
      break;
    case 9: // Space Colonization
      drawEarth(earthX, earthY, earthRadius, 9);
      ctx.beginPath();
      ctx.arc(earthX + 80, earthY - 80, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#a9a9a9'; // Moon base
      ctx.fill();
      ctx.beginPath();
      ctx.arc(earthX - 100, earthY + 100, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4500'; // Mars
      ctx.fill();
      break;
  }

  if (isPlaying) requestAnimationFrame(animate);
}

// Controls
function togglePlayPause() {
  isPlaying = !isPlaying;
  if (isPlaying) animate();
  document.getElementsByTagName('button')[0].textContent = isPlaying ? '[Pause]' : '[Play]';
}

function resetSimulation() {
  time = 0;
  currentStage = 0;
  if (isPlaying) animate();
}

function jumpToStage(stage) {
  time = parseInt(stage) * 10;
  currentStage = parseInt(stage);
  if (isPlaying) animate();
}

// Start Animation
animate();