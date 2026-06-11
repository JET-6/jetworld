/* --------------------------------------------------
   MOBILE TAP-TO-ENTER GATE
-------------------------------------------------- */

let bootTriggered = false;

function startBootSequence() {
    if (bootTriggered) return;
    bootTriggered = true;

    // Hide tap prompt
    const tap = document.getElementById("tap-to-enter");
    tap.style.display = "none";

    // Allow animations to run
    document.body.classList.add("boot-active");

    // Reveal landing container
    const landing = document.querySelector(".landing-container");
    landing.style.opacity = "1";
    landing.style.pointerEvents = "auto";

    // Start the globe animation AFTER the CSS boot timing
    setTimeout(() => {
        animate();
    }, 3400);
}

if (window.innerWidth < 600) {
    const tap = document.getElementById("tap-to-enter");
    tap.addEventListener("click", startBootSequence);
} else {
    // Desktop: start immediately
    startBootSequence();
}

/* --------------------------------------------------
   JETWORLD 3D GLOBE
-------------------------------------------------- */

const container = document.getElementById("globe-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 3.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(256, 256);
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Base material (texture visible)
const material = new THREE.MeshStandardMaterial({
    emissive: 0x00ffff,
    emissiveIntensity: 0.35,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.95
});

// Wireframe overlay (subtle)
const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});

// Meshes
const globe = new THREE.Mesh(geometry, material);
const wireframe = new THREE.Mesh(geometry, wireMaterial);

scene.add(globe);
scene.add(wireframe);

// Load Earth texture AFTER globe exists
textureLoader.load("earth.jpg", (earthTexture) => {
    material.map = earthTexture;
    material.needsUpdate = true;
});

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const holoLight = new THREE.AmbientLight(0x00ffff, 2.5);
scene.add(holoLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}

// Shutdown sequence
function shutdownJETWORLD() {
  const overlay = document.getElementById('shutdown-overlay');
  overlay.classList.add('shutdown-active');

  // Optional: fade out audio, stop animation loop, etc.
}
const globeContainer = document.getElementById('globe-container');

globeContainer.addEventListener('click', shutdownJETWORLD);


/* IF WE WANT TO REDIRECT OR LEAD INTO SOMETHING ELSE
globeContainer.addEventListener('click', () => {
  shutdownJETWORLD();
  setTimeout(() => {
    window.location.href = "nextpage.html";
  }, 1800); // matches animation duration
});
*/