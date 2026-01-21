/* --- bg-animation.js --- */
// Shared 3D background logic
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 25);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Coin Group
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    // Geometry
    const baseGeo = new THREE.CylinderGeometry(3, 3, 0.4, 64);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4, metalness: 0.8 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.rotation.x = Math.PI / 2;
    coinGroup.add(base);

    const rimGeo = new THREE.TorusGeometry(3, 0.15, 16, 100);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 1.0, roughness: 0.2 });
    coinGroup.add(new THREE.Mesh(rimGeo, rimMat));

    // "X" Logo
    const xMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.2, clearcoat: 1.0 });
    const barGeo = new THREE.BoxGeometry(2.8, 0.6, 0.5);
    const bar1 = new THREE.Mesh(barGeo, xMat);
    bar1.rotation.z = Math.PI / 4; bar1.position.z = 0.2;
    const bar2 = new THREE.Mesh(barGeo, xMat);
    bar2.rotation.z = -Math.PI / 4; bar2.position.z = 0.2;
    const xGroup = new THREE.Group();
    xGroup.add(bar1, bar2);
    coinGroup.add(xGroup);

    // Glow Ring
    const glowGeo = new THREE.TorusGeometry(2.2, 0.05, 16, 64);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff9f0a });
    const glowRing = new THREE.Mesh(glowGeo, glowMat);
    glowRing.position.z = 0.25;
    coinGroup.add(glowRing);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 10);
    scene.add(dirLight);
    const rimLight = new THREE.SpotLight(0xff9f0a, 5);
    rimLight.position.set(-10, 0, 5);
    scene.add(rimLight);

    // Animation Position (Shifted right for content)
    coinGroup.position.x = 4; 

    // Loop
    let mouseX = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        coinGroup.rotation.z -= 0.002;
        coinGroup.rotation.y += 0.03 * (mouseX * 0.5 - coinGroup.rotation.y);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});