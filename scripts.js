// JETWORLD 3D globe

const container = document.getElementById("globe-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 3.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(128, 128);
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Texture + material
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
    "https://raw.githubusercontent.com/turban/webgl-earth/master/images/earth.jpg"
);

const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    emissive: 0x003333,
    emissiveIntensity: 0.25
});

// Mesh
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Lights
const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}

animate();
