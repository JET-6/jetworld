// JETWORLD 3D Globe

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

// Load Earth texture
const earthTexture = textureLoader.load(
    "earth.jpg",
    () => {
        globe.material.map = earthTexture;
        globe.material.needsUpdate = true;
    }
);

// Base material (texture visible)
const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    emissive: 0x00ffff,
    emissiveIntensity: 0.35,   // lower glow so texture shows
    metalness: 0.0,
    roughness: 0.9,            // softer, more matte = more texture
    transparent: true,
    opacity: 0.95
});

// Wireframe overlay (subtle)
const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.15              // lower so it doesn't overpower
});

// Meshes
const globe = new THREE.Mesh(geometry, material);
const wireframe = new THREE.Mesh(geometry, wireMaterial);

scene.add(globe);
scene.add(wireframe);

// Lighting

scene.add(new THREE.AmbientLight(0x00ffff, 2.5));

// Lights
const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

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

animate();
