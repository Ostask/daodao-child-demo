<template>
    <div>
        <div class="three" id="three"></div>
    </div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js';

export default {
    data(){
        return {

        }
    },
    mounted(){
        let mesh, renderer, scene, camera;

        let lightProbe;
        let directionalLight;

        // linear color space
        const API = {
            lightProbeIntensity: 1.0,
            directionalLightIntensity: 0.2,
            envMapIntensity: 1
        };

        let ele = document.getElementById('three')

        init();

        function init() {

            // renderer
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( ele.clientWidth, ele.clientHeight );
            ele.appendChild( renderer.domElement );

            // tone mapping
            renderer.toneMapping = THREE.NoToneMapping;

            renderer.outputEncoding = THREE.sRGBEncoding;

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera( 40, ele.clientWidth / ele.clientHeight, 1, 1000 );
            camera.position.set( 0, 0, 30 );

            // controls
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
            controls.minDistance = 10;
            controls.maxDistance = 50;
            controls.enablePan = false;

            // probe
            lightProbe = new THREE.LightProbe();
            scene.add( lightProbe );

            // light
            directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
            directionalLight.position.set( 10, 10, 10 );
            scene.add( directionalLight );

            // envmap
            const genCubeUrls = function ( prefix, postfix ) {

                return [
                    prefix + 'px' + postfix, prefix + 'nx' + postfix,
                    prefix + 'py' + postfix, prefix + 'ny' + postfix,
                    prefix + 'pz' + postfix, prefix + 'nz' + postfix
                ];

            };

            const urls = genCubeUrls( 'http://192.168.2.122:10300/imgs/', '.png' );

            new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

                cubeTexture.encoding = THREE.sRGBEncoding;

                scene.background = cubeTexture;

                lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );

                const geometry = new THREE.SphereBufferGeometry( 5, 64, 32 );
                //const geometry = new TorusKnotBufferGeometry( 4, 1.5, 256, 32, 2, 3 );

                const material = new THREE.MeshStandardMaterial( {
                    color: 0xffffff,
                    metalness: 0,
                    roughness: 0,
                    envMap: cubeTexture,
                    envMapIntensity: API.envMapIntensity,
                } );

                // mesh
                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );

                render();

            } );

        }

        function render() {

            renderer.render( scene, camera );

        }

    }
}
</script>
<style lang="scss" scoped>
    .three{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
</style>