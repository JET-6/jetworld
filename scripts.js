/* --------------------------------------------------
   MOBILE TAP-TO-ENTER GATE
-------------------------------------------------- */

let bootTriggered = false;

function startBootSequence() {
    if (bootTriggered) return;
    bootTriggered = true;

    const tap = document.getElementById("tap-to-enter");
    tap.style.display = "none";

    document.body.classList.add("boot-active");

    const landing = document.querySelector(".landing-container");
    landing.style.opacity = "1";
    landing.style.pointerEvents = "auto";

    setTimeout(() => {
        animate();
    }, 3400);
}

if (window.innerWidth < 600) {
    document.getElementById("tap-to-enter").addEventListener("click", startBootSequence);
} else {
    startBootSequence();
}

/* --------------------------------------------------
   JETWORLD 3D GLOBE
-------------------------------------------------- */

const container = document.getElementById("globe-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(256, 256);
container.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const textureLoader = new THREE.TextureLoader();

const material = new THREE.MeshStandardMaterial({
    emissive: 0x00ffff,
    emissiveIntensity: 0.35,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.95
});

const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});

const globe = new THREE.Mesh(geometry, material);
const wireframe = new THREE.Mesh(geometry, wireMaterial);

scene.add(globe);
scene.add(wireframe);

textureLoader.load("earth.jpg", (earthTexture) => {
    material.map = earthTexture;
    material.needsUpdate = true;
});

scene.add(new THREE.AmbientLight(0x404040, 1.5));
scene.add(new THREE.AmbientLight(0x00ffff, 2.5));

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}

/* --------------------------------------------------
   SHUTDOWN + BLACKOUT
-------------------------------------------------- */

function shutdownJETWORLD() {
  document.getElementById('shutdown-overlay').classList.add('shutdown-active');
}

function startBlackout() {
  const blackout = document.getElementById('blackout');

  setTimeout(() => {
    blackout.classList.add('active');
  }, 800);

  setTimeout(() => {
    window.location.href = "void.html";
  }, 2000);
}

document.getElementById('globe-container').addEventListener('click', () => {
  shutdownJETWORLD();
  startBlackout();
});
