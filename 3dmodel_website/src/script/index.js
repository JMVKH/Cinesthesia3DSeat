const section = document.querySelector("section.book")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x999999, 3.0);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 3.0);
light.position.set(5,5,20);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);


//const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 );
//const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 50;

let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

var loader = new THREE.GLTFLoader();

var obj;
loader.load("../models/seat/seat.glb", function(gltf){
    obj = gltf.scene;
    obj.scale.set(1.15, 1.15, 1.15);
    obj.position.set(10, -11, 0);
    scene.add(gltf.scene);

    function animate() {
        requestAnimationFrame( animate );
    
        currentTimeline += (aimTimeline - currentTimeline) * 0.02;
    
        const rx = currentTimeline * -0.3 + 0.5;
        const ry = (currentTimeline *1.3 + 0.1) * Math.PI *2;
    
        obj.rotation.set(rx, ry, 0)
    
        renderer.render( scene, camera );
    }
    animate();
    
    
    window.addEventListener("scroll", function () {
        aimTimeline = window.pageYOffset / 3000;
    })
})

