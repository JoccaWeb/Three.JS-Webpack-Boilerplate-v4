// Three.JS Webpack Boilerplate Joccaweb V4
// Note: Have to activate SourceControl on this project
// (first upload the changed files, then download the whole project to the local GitHub dir, then backup the GitHub Project to usb stick, then remove the project from the Frontend/Projects dir)

import css from './app.scss';

console.log( 'TEST from APP.js' );

import * as THREE from 'three';
import Detector from './js/Detector';
import OrbitControls from 'three-orbitcontrols';
import Box from './js/Box';

//////////
// MAIN //
//////////

// Global variables, brushing up:
// For example, variable scene must be global 'cause it's used in functions outside of init(), in drawFloor() for example.
var scene, camera, renderer,
// The lights need no global variable for now. For example, if a spotlight needs to be animated, a light variable would turn up in the render() function and then global declaration is needed.
// testBox is animated now, must be declared globally
testBox;
// Note: the variable box from the Box class is used in the drawClassBox() function, it's coupled to the classBox variable and doesn't have to be declared globally here. The variable classBox itself also not, unless classBox is gonna be used in other functions.


////////////////////////
// MAIN INIT FUNCTION //
////////////////////////

function init() {
    
    ///////////
    // SCENE //
    ///////////

    scene = new THREE.Scene();
    // brushing up: no var keyword, var already globally declared

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
    renderer = Detector.webgl? new THREE.WebGLRenderer ( {
            antialias: true
        } ): new THREE.CanvasRenderer();
    
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );    

    var world = document.querySelector( '.world' );
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
// end init function

//////////////////////
// OBJECT FUNCTIONS //
//////////////////////

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
    // BoxGeometry parameters: width (x), height (y), depth (z), 
	// (optional) segments along x, segments along y, segments along z    
    // mesh, geometry and material could be abstracted away to a class,like the Box class. Position and other properties too, we can decide for ourselves if that's convenient or not.
    testBox = new THREE.Mesh(
        new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ),
        new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
    );
    
    // testBox nicely aligned on the floor with these values
    // testBox.position.set( -100, 50, -50 );
    // testBox.rotation.set( 0, 0, 0 );
    // these values can be changed without losing the reset coordinates above
    testBox.position.set( -100, 90, -50 );
    // rotation handled in render function at the moment    
    
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

// calling box-geometry from the Box class
function drawClassBox() {
     var classBox = new Box();

     // positioning the Box (positioning an object from a class)
      classBox.box.position.set( 0, 15, -15 );

     scene.add( classBox.box );  
}

/////////////////////////////
// ANIMATING and RENDERING //
/////////////////////////////

// removed the extra animate() function since the rendering code has so few lines
function render() {
    requestAnimationFrame( render );

    testBox.rotation.x += 0.01;
 	testBox.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onResize() {
    // onResize function resizing to whole viewport
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// running the three.js code
init();
// animate() replaced by render()
render();