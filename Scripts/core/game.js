/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
ADVANCED_GRAPHICS_COMP392_TEST1
CENTENNIAL_COLLEGE_W2016
Author: Ilmir Taychinov 300760705
Based on: Tom Tsiliopoulos template for midterm
Created: 2 March 2016
Last Modified: 2 March 2016
*/
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    //-----adding required objects-------
    var axes;
    var plane;
    var ambientLight;
    var spotLight;
    var tower;
    //---end of edited area-----------------
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        // add an axis helper to the scene
        axes = new AxisHelper(10);
        scene.add(axes);
        console.log("Added Axis Helper to scene...");
        //Add a Plane to the Scene
        plane = new gameObject(new PlaneGeometry(24, 24, 1, 1), new LambertMaterial({ color: 0x123456 }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        // Add Lights to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(14, 40, 12);
        spotLight.rotation.set(0, 0, 0);
        spotLight.intensity = 2;
        spotLight.castShadow = true;
        //make shadows more neat and a bit brighter
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowDarkness = 0.5;
        spotLight.shadowCameraFar = 1000;
        spotLight.shadowCameraNear = 0.1;
        scene.add(spotLight);
        ambientLight = new AmbientLight(0x949494);
        scene.add(ambientLight);
        console.log("Added a AmbientLight and SpotLight Light to Scene");
        //generate tower
        tower = new Object3D();
        addCubes(0, 1, 0, 1, 1, 1, tower);
        scene.add(tower);
        // add controls
        gui = new GUI();
        control = new Control();
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        function addCubes(x, y, z, h, d, w, attachTo) {
            var cubeGeometry = new CubeGeometry(h, w, d);
            var thisCube = new Mesh(cubeGeometry, new LambertMaterial({ color: Math.random() * 0xffffff }));
            thisCube.position.set(x, y, z);
            thisCube.castShadow = true;
            thisCube.receiveShadow = true;
            attachTo.add(thisCube);
        }
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
