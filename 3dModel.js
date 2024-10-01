import * as THREE from 'http://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'http://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'http://cdn.skypack.dev/gsap';

// Camera setup
const camera = new THREE.PerspectiveCamera(
  20, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13; // Move camera back

// Scene setup
const scene = new THREE.Scene();

// Load the butterfly model
let butterfly;
let mixer;
const loader = new GLTFLoader();

loader.load(
  '/butterfly.glb',
  function (gltf) {
    butterfly = gltf.scene;
    butterfly.position.y = 0;
    butterfly.position.x = 2.3;
    butterfly.rotation.y = 2.3;
    butterfly.rotation.z = 0;
    butterfly.rotation.x = 0;
    scene.add(butterfly);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(butterfly);
      const action = mixer.clipAction(gltf.animations[0]); 
      action.play();
    } else {
      console.warn('No animations found in the model.');
    }
  },
  function (xhr){},
  function (error){}
);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Corrected the light color and intensity
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 10);
topLight.position.set(500, -500, 500);
scene.add(topLight);

// Render loop
const rerender3D = () => {
  requestAnimationFrame(rerender3D);
  renderer.render(scene, camera);
  if(mixer) mixer.update(0.02);
};

rerender3D();

let arrPositionModel = [
    {
        id:'hero',
        position: {x:2.3, y:0, z:0},
        rotation: {x:0, y:2.3, z:0.5}
    },
    {
        id:'about',
        position: {x:-2, y:0.2, z:0},
        rotation: {x:1, y:0, z:0}
    },
    {
        id:'image-section',
        position: {x:2.7, y:0.2, z:0},
        rotation: {x:1, y:0, z:0}
    },
    {
        id:'services',
        position: {x:-3, y:0, z:0},
        rotation: {x:1.6, y:0, z:0}
    },
    {
        id:'contact',
        position: {x:-3.5, y:0, z:0},
        rotation: {x:2, y:5-7, z:0}
    }
];

const modelMove = () => { 
    const sections = document.querySelectorAll('.section');
    let currentSection
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if(rect.top <= window.innerHeight / 3){
            currentSection = section.id
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    ); 
    if(position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(butterfly.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        // Animate the rotation as well (optional if needed)
        gsap.to(butterfly.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3, // Same duration for rotation
            ease: "power1.out"
        });
    }
};

window.addEventListener('scroll', () => {
    if (butterfly) {
        modelMove();
    }
});