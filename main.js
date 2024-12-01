// main.js

// Ensure Three.js is loaded
if (!THREE) {
    alert('Three.js not loaded. Please check your script paths.');
}

// Scene, Camera, Renderer
const scene = new THREE.Scene();

// Set up camera: FOV, aspect ratio, near clipping, far clipping
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 15, 35);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb); // Sky blue background
document.body.appendChild(renderer.domElement);

// Enable Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 100, 50);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// Football Field
const grassColor = 0x006400; // Dark Green
const fieldGeometry = new THREE.PlaneGeometry(200, 100);
const fieldMaterial = new THREE.MeshLambertMaterial({ color: grassColor });
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI / 2; // Rotate to lay flat
field.receiveShadow = true;
scene.add(field);

// Enhanced Goalpost
const postMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

const goalWidth = 20; // Increased goal width
const goalHeight = 5; // Increased goal height
const goalDepth = 2;

const leftPostGeometry = new THREE.CylinderGeometry(0.2, 0.2, goalHeight, 32);
const leftPost = new THREE.Mesh(leftPostGeometry, postMaterial);
leftPost.position.set(-goalWidth / 2, goalHeight / 2, -50);
leftPost.castShadow = true;
scene.add(leftPost);

const rightPost = leftPost.clone();
rightPost.position.x = goalWidth / 2;
scene.add(rightPost);

const crossbarGeometry = new THREE.BoxGeometry(goalWidth, 0.2, goalDepth);
const crossbar = new THREE.Mesh(crossbarGeometry, postMaterial);
crossbar.position.set(0, goalHeight, -50);
crossbar.castShadow = true;
scene.add(crossbar);

// Ground Plane (optional, for better visuals)
const groundColor = 0x444444;
const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshLambertMaterial({ color: groundColor });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;
scene.add(ground);

// Football
const ballColor = 0xffffff;
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({ color: ballColor });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0.5, 0);
ball.castShadow = true;
ball.receiveShadow = true;
scene.add(ball);

// Create Detailed Player (Humanoid)
const player = new THREE.Group();

// Body
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blue color
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0.5;
body.castShadow = true;
player.add(body);

// Head
const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffd1dc }); // Skin color
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 3.2;
head.castShadow = true;
player.add(head);

// Legs
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
const legMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blue color

const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.2, 1, 0);
leftLeg.castShadow = true;
player.add(leftLeg);

const rightLeg = leftLeg.clone();
rightLeg.position.x = 0.2;
player.add(rightLeg);

// Arms
const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32);
const armMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blue color

const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.75, 2.75, 0);
leftArm.rotation.z = Math.PI / 4;
leftArm.castShadow = true;
player.add(leftArm);

const rightArm = leftArm.clone();
rightArm.position.x = 0.75;
rightArm.rotation.z = -Math.PI / 4;
player.add(rightArm);

// Position the player
player.position.set(0, 0, 10);
scene.add(player);

// Goalkeeper (Simple Humanoid)
const goalkeeper = new THREE.Group();

// Body
const gkBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 2, 32), new THREE.MeshLambertMaterial({ color: 0xff0000 })); // Red color
gkBody.position.y = 2;
gkBody.castShadow = true;
goalkeeper.add(gkBody);

// Head
const gkHead = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshLambertMaterial({ color: 0xffd1dc })); // Skin color
gkHead.position.y = 3.2;
gkHead.castShadow = true;
goalkeeper.add(gkHead);

// Legs
const gkLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2, 32), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
gkLeg.position.set(-0.2, 1, 0);
gkLeg.castShadow = true;
goalkeeper.add(gkLeg);

const gkLeg2 = gkLeg.clone();
gkLeg2.position.x = 0.2;
goalkeeper.add(gkLeg2);

// Arms
const gkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
gkArm.position.set(-0.75, 2.75, 0);
gkArm.rotation.z = Math.PI / 4;
gkArm.castShadow = true;
goalkeeper.add(gkArm);

const gkArm2 = gkArm.clone();
gkArm2.position.x = 0.75;
gkArm2.rotation.z = -Math.PI / 4;
goalkeeper.add(gkArm2);

// Position the goalkeeper
goalkeeper.position.set(0, 0, -50);
scene.add(goalkeeper);

// Game Variables
let shootDirection = 0;
let shootPower = 0;
let isShooting = false;
let ballVelocity = new THREE.Vector3(0, 0, 0);
let goals = 0;
let misses = 0;

// UI Elements
const goalsSpan = document.getElementById('goals');
const missesSpan = document.getElementById('misses');
const messageDiv = document.getElementById('message');

// Event Listeners for Controls
document.addEventListener('mousemove', function(event) {
    // Map mouse X to shoot direction (-45 to +45 degrees)
    const mouseX = (event.clientX / window.innerWidth) - 0.5;
    shootDirection = mouseX * (Math.PI / 3); // Increase to ~60 degrees for more range
});

document.addEventListener('mousedown', function() {
    if (isShooting) return; // Prevent multiple shoots at the same time
    isShooting = true;
    shootPower = 0;

    // Increase shoot power over time while mouse is held down
    const powerInterval = setInterval(function() {
        shootPower += 10; // Increase power faster
        if (shootPower >= 15) clearInterval(powerInterval); // Higher max power
    }, 100);

    document.addEventListener('mouseup', function() {
        clearInterval(powerInterval);
        kickBall();
    }, { once: true });
});

// Kick Ball Function
function kickBall() {
    // Calculate initial velocity based on direction and power
    const speed = shootPower;
    const vx = Math.sin(shootDirection) * speed;
    const vz = -Math.cos(shootDirection) * speed;
    const vy = speed * 0.8; // Increased upward force for more arc

    ballVelocity.set(vx, vy, vz);

    isShooting = false;
    messageDiv.textContent = '';
}

// Animate Ball
function animateBall(delta) {
    if (ballVelocity.length() > 0) {
        // Update position
        ball.position.add(ballVelocity.clone().multiplyScalar(delta));

        // Apply gravity
        ballVelocity.y -= 9.81 * delta;

        // Collision with ground
        if (ball.position.y <= 0.5) {
            ball.position.y = 0.5;
            ballVelocity.y = -ballVelocity.y * 0.8; // Bounce with damping
        }

        // Check for goal
        if (ball.position.z <= -50) {
            // Check if within goal width and height
            if (
                Math.abs(ball.position.x) <= (goalWidth / 2) &&
                ball.position.y <= goalHeight
            ) {
                goals += 1;
                goalsSpan.textContent = goals;
                messageDiv.textContent = 'GOAL!';
            } else {
                misses += 1;
                missesSpan.textContent = misses;
                messageDiv.textContent = 'Missed!';
            }
            resetBall();
        }

        // Check for out of bounds
        if (Math.abs(ball.position.x) > 100 || ball.position.y > 50 || ball.position.z > 100) {
            misses += 1;
            missesSpan.textContent = misses;
            messageDiv.textContent = 'Missed!';
            resetBall();
        }
    }
}

// Reset Ball Position
function resetBall() {
    ball.position.set(0, 0.5, 0);
    ballVelocity.set(0, 0, 0);
}

// Animate Goalkeeper
function animateGoalkeeperMovement(delta) {
    // Simple back and forth movement with increased speed
    const speed = 3; // units per second
    const amplitude = 5; // movement range
    goalkeeper.position.x = Math.sin(Date.now() * 0.003) * amplitude;
}

// Render Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    animateBall(delta);
    animateGoalkeeperMovement(delta);

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});