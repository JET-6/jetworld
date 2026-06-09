// JETWORLD landing page scripts will go here
console.log("JETWORLD loaded");

// === 3D GLOBE SETUP ===
const container = document.getElementById("globe-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    1, // square aspect ratio
    0.1,
    1000
);
camera.position.z = 2;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(64, 64); // fits inside the text
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Texture (simple world map)
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard-pro/assets/img/earth.jpg"
);

// Material with neon glow
const material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: new THREE.Color(0x00ffff),
    emissiveIntensity: 0.3
});

// Mesh
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Light
const light = new THREE.PointLight(0x00ffff, 1, 100);
light.position.set(5, 3, 5);
scene.add(light);

// Animation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003; // slow spin
    renderer.render(scene, camera);
}

animate();
