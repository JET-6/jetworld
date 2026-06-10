const container = document.getElementById("globe-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 3.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(128, 128); // safer size
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Texture
const textureLoader = new THREE.TextureLoader();

// Material
const texture = textureLoader.load("https://threejs.org/examples/textures/earth_atmos_2048.jpg")

const material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: 0x003333,
    emissiveIntensity: 0.2
});

// Mesh
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// GLOBE
textureLoader.load(
    "https://threejs.org/examples/textures/earth_atmos_2048.jpg",
    (loadedTexture) => {
        globe.material.map = loadedTexture;
        globe.material.needsUpdate = true;
    }
);

// Light
const light = new THREE.PointLight(0x00ffff, 1, 100);
light.position.set(5, 3, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambient);


// Animation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}

animate();
