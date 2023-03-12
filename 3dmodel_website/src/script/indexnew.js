const section = document.querySelector("section.book")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0,0,6);
scene.add(light);


//const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 );
//const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

var loader = new GLTFLoader();

var obj;
loader.load("../models/seat/seat.glb", function(gltf){
    obj = gltf.scene;
    scene.add(gltf.scene);
})

/*
var objLoader = new THREE.OBJLoader();
objLoader.load('../models/seat.obj', function(object){
    object.position.y -= 60;
    object.scene.scale.set(20000, 20000, 20000)
    scene.add(object);
})
*/
/*
const loader = new THREE.GLTFLoader();
loader.load(
    '../models/racetrack/racetrack.glb',
    function (obj) {
        obj.scene.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });
        obj.scene.scale.set(0.1, 0.1, 0.1);
        obj.scene.position.set(1.2, -0.05, 2);
        scene.add(obj);
    },
    // called when loading has errors
    function (error) {
        console.log(error);
    }
);
*/





camera.position.z = 6;

let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

function animate() {
	requestAnimationFrame( animate );

    currentTimeline += (aimTimeline - currentTimeline) * 0.02;

    const rx = currentTimeline * -0.5 + 0.5;
    const ry = (currentTimeline *0.9 + 0.1) * Math.PI *2;

    cube.rotation.set(rx, ry, 0)

	renderer.render( scene, camera );
}
animate();


window.addEventListener("scroll", function () {
    aimTimeline = window.pageYOffset / 3000;
})