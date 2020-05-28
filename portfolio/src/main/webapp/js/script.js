let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
let container = document.getElementById('world');
let w = container.offsetWidth;
let h = container.offsetHeight;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxBufferGeometry(3, 2, 2, 3, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: "#0F9D58",
    wireframe: true,
  });
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;


var animate = function () {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render( scene, camera );
    window.addEventListener('resize',handleWindowResize,false);
};

var handleWindowResize = function () {
    // update height and width of the renderer and the camera
	WIDTH = container.offsetWidth;
	HEIGHT = container.offsetHeight;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}
animate();

