# Three.JS-Webpack-Boilerplate-v4

By [JoccaWeb](http://joccaweb.nl/ "My frontend portfolio"). 

This project assumes intermediate knowledge of HTML5, CSS3 and vanilla JavaScript.<br>
Suitable for [Webpack](https://webpack.github.io/) and [three.js](https://threejs.org/) beginners. 
I learned a lot from several online sources.<br>
See the credits below!

## Project Goal
To have an environment set up for developing a three.js site, running in combination with Webpack. You'll even have React, Bootstrap, Pug, Babel and Sass installed. And of course Hot Module Reloading and Webpack Dev Server.

## Development Log:
`First off`<br>
See the (many!) comments in app.js for code explanation.

`Window resize`<br>
On [NPMJS.com](https://www.npmjs.com/package/three-window-resize) we can see the NPM version of the THREEx.WindowResize.js code. Can also be done with a little custom code, see app.js. THREEx.WindowResize.js not needed apparently?

`Orbit Controls`<br>
These controls enable the user to rotate, pan and zoom the scene with mouse and keys (and trackpad and touch). Installing through NPM didn't work earlier. Here the second attempt:<br>[three-orbitcontrols](https://www.npmjs.com/package/three-orbitcontrols) or [three-orbit-controls](https://www.npmjs.com/package/three-orbit-controls)?<br>

Or without NPM:<br>
From [the controls files from three.js](https://github.com/mrdoob/three.js/tree/master/examples/js/controls) you can go to
[the Orbit Controls file](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js).

OrbitControls.js contains 1040 lines of code, no point in reinventing the wheel i'd say.<br>
So I copied OrbitControls.js to src/js, imported it in app.js, and added a global variable. Did it work? No!<br>
OrbitControls keeps being undefined because of THREE being in the local scope or not or alledgedly, ah well...

Anyhoo: [three-orbitcontrols](https://www.npmjs.com/package/three-orbitcontrols) works!.

`OO programming and three.js`<br>
The [Dino Skater](https://codepen.io/elliepooh/pen/JNjgwy) example was handy for brushing up on the basics of OO programming, which is very much needed for three.js scenes.

`The x, y, z order in three.js`<br>
See the [Microsoft explanation](https://msdn.microsoft.com/en-us/library/dn479430(v=vs.85).aspx) on this.

`WebGL detection`<br>
First we must detect if WebGL is present and provide a message if it's not. We can do this with
[Detector.js](https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js).

See also
[StackOverfow on this](https://stackoverflow.com/questions/9899807/three-js-detect-webgl-support-and-fallback-to-regular-canvas). If you only use the webgl detection code from Detector.js you can put that in a function and apply directly in the app.js code and it works, but then you don't get the user friendly webgl update advice message...

Nevertheless, here the directly-in-app.js way:
```
function webglAvailable() {
    try {
        var canvas = document.createElement("canvas");
        return !!
            window.WebGLRenderingContext && 
            (canvas.getContext("webgl") || 
                canvas.getContext("experimental-webgl"));
        } catch(e) { 
        return false;
        }    
    }
    
renderer = webglAvailable() ? new THREE.WebGLRenderer( { antialias: true }) : new THREE.CanvasRenderer();
```
By the way, i couldn't find a NPM package for Detector.js on NPMJS.org

## Short install instructions
1. Clone this repo
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` for development mode
4. New browser window should open automatically.

## Credits
- The [Kobrazova Dino Skater](https://codepen.io/elliepooh/pen/JNjgwy)
- The [Stemkoski page](https://stemkoski.github.io/Three.js/). See his [samples](https://github.com/stemkoski/stemkoski.github.com). Specially the HelloWorld sample.
- The [Three.JS Docs](https://threejs.org/docs/)
- [Petr's Webpack series](https://www.youtube.com/playlist?list=PLkEZWD8wbltnRp6nRR8kv97RbpcUdNawY)
