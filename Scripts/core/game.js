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
//----added extra imports for textures
var Texture = THREE.Texture;
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
    var concreteTexture; //for base of tower
    var whitePlalsticTexture; //top and bottom for view stage of tower (CN tower restaraunt)
    var blueGlassTexture; // glass for view stage of tower (CN tower restaraunt)
    var redGlassTexture; //airplane signal at the top
    var scaler; //Preset for scaling
    var towerBase;
    var towerRestaraunt;
    var towerTop;
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
        //load Textures for the tower
        concreteTexture = THREE.ImageUtils.loadTexture('Content/textures/concrete.jpg');
        redGlassTexture = THREE.ImageUtils.loadTexture('Content/textures/red.jpg');
        blueGlassTexture = THREE.ImageUtils.loadTexture('Content/textures/blue.jpg');
        whitePlalsticTexture = THREE.ImageUtils.loadTexture('Content/textures/white.jpg');
        //generate tower
        tower = new Object3D();
        towerBase = new Object3D();
        towerRestaraunt = new Object3D();
        towerTop = new Object3D();
        //firs 8 block of tower
        scaler = 0.9;
        addCubes(0, 1, 0, 1.2, 1, 1.2, towerBase, concreteTexture);
        addCubes(0, 2, 0, 1.15, 1, 1.15, towerBase, concreteTexture);
        addCubes(0, 3, 0, 1.10, 1, 1.10, towerBase, concreteTexture);
        addCubes(0, 4, 0, 1.05, 1, 1.05, towerBase, concreteTexture);
        addCubes(0, 5, 0, 1, 1, 1, towerBase, concreteTexture);
        addCubes(0, 6, 0, 0.95, 1, 0.95, towerBase, concreteTexture);
        addCubes(0, 7, 0, 0.9, 1, 0.9, towerBase, concreteTexture);
        addCubes(0, 8, 0, 0.85, 1, 0.85, towerBase, concreteTexture);
        //restaraunt part
        addCubes(0, 8.33, 0, 1.6, 0.33, 1.6, towerRestaraunt, whitePlalsticTexture);
        addCubes(0, 8.66, 0, 1.7, 0.33, 1.7, towerRestaraunt, blueGlassTexture);
        addCubes(0, 9, 0, 1.5, 0.34, 1.5, towerRestaraunt, whitePlalsticTexture);
        //top part with antiplane signal
        addCubes(0, 9.33, 0, 0.2, 1.5, 0.2, towerTop, concreteTexture);
        addCubes(0, 10, 0, 0.21, 0.5, 0.21, towerTop, redGlassTexture);
        tower.add(towerBase);
        tower.add(towerRestaraunt);
        tower.add(towerTop);
        scene.add(tower);
        // add controls
        gui = new GUI();
        control = new Control(0.00);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        function addCubes(x, y, z, h, w, d, attachTo, cubeTexture) {
            var cubeGeometry = new CubeGeometry(h * scaler, w * scaler, d * scaler);
            var thisCube = new Mesh(cubeGeometry, new LambertMaterial({ color: 0xffffff, map: cubeTexture }));
            //-----------Random Color Cubes(now replaced with textures)------------------------------------
            //var thisCube:Mesh = new Mesh(cubeGeometry,new LambertMaterial({color: Math.random() * 0xffffff}));
            thisCube.position.set(x * scaler, y * scaler - 0.5, z * scaler);
            thisCube.castShadow = true;
            thisCube.receiveShadow = true;
            attachTo.add(thisCube);
        }
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'groundCubeRotation', -0.25, 0.25);
        gui.add(controlObject, 'secondCubeRotation', -0.25, 0.25);
        gui.add(controlObject, 'thirdCubeRotation', -0.25, 0.25);
        // gui.add(controlObject, 'fourthCubeRotation',-0.25,0.25);
        //  gui.add(controlObject, 'fifthCubeRotation',-0.25,0.25);
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
        //rotation 
        /* basic tower rotation
        tower.children[0].rotation.y+=control.groundCubeRotation;
        tower.children[1].rotation.y+=control.secondCubeRotation;
        tower.children[2].rotation.y+=control.thirdCubeRotation;
        tower.children[3].rotation.y+=control.fourthCubeRotation;
        tower.children[4].rotation.y+=control.fifthCubeRotation;
        */
        tower.children[0].rotation.y += control.groundCubeRotation;
        tower.children[1].rotation.y += control.secondCubeRotation;
        tower.children[2].rotation.y += control.thirdCubeRotation;
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
