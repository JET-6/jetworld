const container = document.getElementById("globe-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(128, 128); // safer size
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Texture
/* const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    "https://threejs.org/examples/textures/earth_atmos_2048.jpg"
); */


// Material
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    "https://threejs.org/examples/textures/earth_atmos_2048.jpg",
    () => {
        globe.material.map = texture;
        globe.material.needsUpdate = true;
    }
);

const material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: new THREE.Color(0x00ffff),
    emissiveIntensity: 0.25
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
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}

animate();
