/* --- THREE.JS & MEDIAPIPE LOGIC --- */
const CONFIG = {
  segmentsX: 60,
  segmentsY: 40,
  color: 0xe0e6ed, // Changed to white to match the theme
  cameraZ: 30,
  brushRadius: 7.0,
  brushStrength: 1.2,
  decay: 0.98,
  waveSpeed: 1.0,
  waveHeight: 0.5,
};

let scene,
  camera,
  renderer,
  mesh,
  elevationData = [];
let worldWidth,
  worldHeight,
  fingerPos = { x: 0, y: 0, active: false };
const canvas = document.getElementById("mesh-canvas");
const videoElement = document.getElementById("webcam");

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = CONFIG.cameraZ;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const vFOV = (camera.fov * Math.PI) / 180;
  const h = 2 * Math.tan(vFOV / 2) * CONFIG.cameraZ;
  const w = h * camera.aspect;
  worldWidth = w * 1.5;
  worldHeight = h * 1.5;

  const geometry = new THREE.PlaneGeometry(
    worldWidth,
    worldHeight,
    CONFIG.segmentsX,
    CONFIG.segmentsY,
  );
  elevationData = new Float32Array(geometry.attributes.position.count).fill(0);

  const material = new THREE.MeshBasicMaterial({
    color: CONFIG.color,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function onResults(results) {
  document.getElementById("loading").style.display = results.multiHandLandmarks
    ? "none"
    : "block";
  if (results.multiHandLandmarks?.length > 0) {
    const tip = results.multiHandLandmarks[0][8];
    fingerPos.x = (1 - tip.x) * worldWidth - worldWidth / 2;
    fingerPos.y = (1 - tip.y) * worldHeight - worldHeight / 2;
    fingerPos.active = true;
  } else {
    fingerPos.active = false;
  }
}

function initMediaPipe() {
  const hands = new Hands({
    locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
  });
  hands.onResults(onResults);
  new Camera(videoElement, {
    onFrame: async () => await hands.send({ image: videoElement }),
    width: 640,
    height: 480,
  }).start();
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() / 1000;
  const pos = mesh.geometry.attributes.position.array;

  for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
    const x = pos[i * 3],
      y = pos[i * 3 + 1];
    const wave =
      Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * CONFIG.waveHeight;

    if (fingerPos.active) {
      const dist = Math.sqrt((x - fingerPos.x) ** 2 + (y - fingerPos.y) ** 2);
      if (dist < CONFIG.brushRadius) {
        elevationData[i] +=
          (1 - dist / CONFIG.brushRadius) * CONFIG.brushStrength;
      }
    }
    elevationData[i] *= CONFIG.decay;
    pos[i * 3 + 2] = wave + elevationData[i];
  }
  mesh.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- MOBILE MENU NAVIGATION LOGIC --- //

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile");
    navLinks.classList.toggle("active");
  });
});

initThree();
initMediaPipe();
animate();
