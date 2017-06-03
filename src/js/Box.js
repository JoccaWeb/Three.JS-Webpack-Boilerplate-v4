import * as THREE from 'three';

console.log( 'Box class is present' );

// the export default prefix is needed because of ES2015, Babel and Webpack as far as i understand
export default class Box {
    constructor() {
        this.box = new THREE.Mesh(
            new THREE.BoxGeometry( 30, 30, 50, 1, 1, 1 ),
            new THREE.MeshLambertMaterial( { color: 0x375076 })
        );
       
    }    
}