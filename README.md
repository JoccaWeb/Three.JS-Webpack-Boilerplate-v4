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
From [The controls files from three.js](https://github.com/mrdoob/three.js/tree/master/examples/js/controls) to
[the Orbit Controls file](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js).

OrbitControls.js contains 1040 lines of code, no point in reinventing the wheel i'd say.<br>
I copied OrbitControls.js to src/js, imported it in app.js, and added a global variable. See app.js. It works? No! OrbitControls keeps being undefined because of THREE being in the local scope or not or alledgedly, ah well...
