// Three.JS Webpack Boilerplate Joccaweb V4

import css from './app.scss';

console.log( 'TEST from APP.js' );

import * as THREE from 'three';
import Detector from './js/Detector';
import OrbitControls from 'three-orbitcontrols';
import Box from './js/Box';

//////////
// MAIN //
//////////

// standard global variables
let scene, camera, renderer, world,
// (lights need no external variable (for now?))

box; // for separate Box classfile

// custom global variables
// floor; testBox, testSphere;

// FUNCTIONS //

function init() {
    
    ///////////
    // SCENE //
    ///////////

    scene = new THREE.Scene();

    ////////////
    // CAMERA //
    ////////////

    // set the view size in pixels (custom or according to window size), the viewport size mathes the main camera attributes	
    // var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    
    // main camera attributes
	var VIEW_ANGLE = 45, 
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;

    // setup camera
    camera = new THREE.PerspectiveCamera( 
        VIEW_ANGLE, ASPECT, NEAR,FAR );
    // add camera to scene (not needed apparently?, the renderer adds it i think)
    // scene.add(camera);

    // the camera defaults to position (0,0,0)
	// so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin    
    camera.position.set( 0, 150, 400 );
    camera.lookAt( scene.position );   
    
    //////////////
    // RENDERER //
    //////////////

    // create and start the renderer, choose antialias setting
    // using Detector.js for WebGL detection in this project (see README.md)

    // renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer = Detector.webgl? new THREE.WebGLRenderer ( { antialias: true } ): new THREE.CanvasRenderer();
    
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );    

    world = document.querySelector( '.world' );
    world.appendChild( renderer.domElement );

    ////////////////////
    // ORBIT CONTROLS //
	////////////////////

    // setup the Orbit Controls, see README.md
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

	///////////
    // LIGHT //
	///////////

    // Lambert materials go black with no lights on, as opposed to Basic materials, who you could say have a default 100% ambient light
	
    // set white pointlight
	var light = new THREE.PointLight( 0xffffff );
	light.position.set( 0,250,0 );
	scene.add( light );
	
    // set ambient light
    // grey values in three.js's lights set the amount of white light in the scene really, a colorpicker plugin in your browser would come in handy here
    // #5b5b5b is about 35% black (or 65% white)
    // check how ambient light works together with the other lights
    var ambientLight = new THREE.AmbientLight( 0x5b5b5b );
	scene.add(ambientLight);
  
    /////////////
    // OBJECTS //
    /////////////

    // add objects to scene 
    drawFloor();   
    drawTestBox();
    drawTestSphere();
    // add class objects to scene
    drawClassBox();

    ////////////
    // EVENTS //
    ////////////

    // resize to whole viewport on changing viewport
    window.addEventListener( 'resize', onResize );
}
// end of init function

function drawFloor() {
    var floor = new THREE.Mesh(  
        new THREE.PlaneGeometry( 1000, 1000, 1, 1 ),
        // Lambert material responds to light as opposed to Basic
        new THREE.MeshLambertMaterial( { 
            color: 0xff0000,
            // render color or texture on both sides of mesh
            // side: THREE.DoubleSide
        } )
    );  
    // pi / 2 represents a rotation of 90 degrees
    // floor.rotation.x = -Math.PI/2;
    // if you use the negative value for Math.PI, you don't need the DoubleSide option? Indeed! The non-visible backside of the plane is not in view anymore.
    floor.position.set( 0, -.5, 0 );
    floor.rotation.set( - Math.PI / 2, 0, 0 );

    scene.add( floor );
}

function drawTestBox() {
    // box parameters: width (x), height (y), depth (z), 
	// (optional) segments along x, segments along y, segments along z    
    var testBox = new THREE.Mesh(
        new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ),
        new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
    );
    
    // box nicely aligned on the floor with these values
    // box.position.set( -100, 50, -50 );
    // box.rotation.set( 0, 0, 0 );
    // these values can be changed without losing the reset coordinates above
    testBox.position.set( -100, 50, -50 );
    testBox.rotation.set( 0, 0, 0 );
    
    scene.add( testBox );
}

function drawTestSphere() {
    // Sphere parameters: radius, segments along width, segments along height    
    var testSphere = new THREE.Mesh(
        new THREE.SphereGeometry( 50, 32, 16 ),
        new THREE.MeshLambertMaterial( { color: 0x0000ff } )
    );
    
    // sphere nicely aligned on the floor with these values
    // sphere.position.set( 100, 50, -50 );
    // sphere.rotation.set( 0, 0, 0 );
    // these values can be changed without losing the reset coordinates above
    testSphere.position.set( 100, 50, -50 );
    testSphere.rotation.set( 0, 0, 0 );
    
    scene.add( testSphere );
}

// calling box from class
function drawClassBox() {
     var classBox = new Box();
     scene.add( classBox.box );  
}

function onResize() {
    // onResize function resizing to whole viewport
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

///////////////////////////
// RUNNING AND ANIMATING //
///////////////////////////

// animate function activates the render function and updates renderer to get animations going
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    // animation code for objects here    
    
    renderer.render(scene, camera);
}
// running the three.js code
init();
animate();
