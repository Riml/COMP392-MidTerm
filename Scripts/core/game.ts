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
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
//----added extra imports for textures
import Texture =THREE.Texture;
//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    
    //-----adding required objects-------
    var axes: AxisHelper;
    var plane: Mesh;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    var tower: Object3D;
    var concreteTexture: Texture; //for base of tower
    var whitePlalsticTexture: Texture; //top and bottom for view stage of tower (CN tower restaraunt)
    var blueGlassTexture: Texture; // glass for view stage of tower (CN tower restaraunt)
    var redGlassTexture: Texture; //airplane signal at the top
    var scaler:number; //Preset for scaling
    
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
        plane = new gameObject(new PlaneGeometry(24, 24, 1, 1),new LambertMaterial({ color: 0x123456 }),0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
      
        // Add Lights to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(14, 40, 12);
        spotLight.rotation.set(0,0,0);
        spotLight.intensity=2;
        spotLight.castShadow = true;
        //make shadows more neat and a bit brighter
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowDarkness = 0.5;
        spotLight.shadowCameraFar=1000;
        spotLight.shadowCameraNear=0.1;
        scene.add(spotLight);
        ambientLight = new AmbientLight(0x949494);
        scene.add(ambientLight);
        console.log("Added a AmbientLight and SpotLight Light to Scene");
        //load Textures for the tower
        concreteTexture= THREE.ImageUtils.loadTexture('Content/textures/concrete.jpg');
        redGlassTexture= THREE.ImageUtils.loadTexture('Content/textures/red.jpg');
        blueGlassTexture= THREE.ImageUtils.loadTexture('Content/textures/blue.jpg');
        whitePlalsticTexture= THREE.ImageUtils.loadTexture('Content/textures/white.jpg');
        
        //generate tower
        tower = new Object3D();
        //firs 8 block of tower
        scaler=0.5;
        addCubes(0,1,0,1,1,1,tower,concreteTexture);
        addCubes(0,2,0,1,1,1,tower,concreteTexture);
        addCubes(0,3,0,1,1,1,tower,concreteTexture);
        addCubes(0,4,0,1,1,1,tower,concreteTexture);
        addCubes(0,5,0,1,1,1,tower,concreteTexture);
        addCubes(0,6,0,1,1,1,tower,concreteTexture);
        addCubes(0,7,0,1,1,1,tower,concreteTexture);
        addCubes(0,8,0,1,1,1,tower,concreteTexture);
        //restaraunt part
        addCubes(0,9,0,1,0.5,1,tower,whitePlalsticTexture);
        addCubes(0,9.5,0,1,0.5,1,tower,blueGlassTexture);  
        addCubes(0,10,0,1,1,1,tower,whitePlalsticTexture);
        //top part with antiplane signal
        addCubes(0,11,0,1,1,1,tower,concreteTexture);
        addCubes(0,12,0,1,1,1,tower,redGlassTexture);
                      
                      
                        addCubes(0,5,0,1,1,1,tower,concreteTexture);
        scene.add(tower);
        
 
        // add controls
        gui = new GUI();
        control= new Control(-0.001);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        
        
        function addCubes(x:number,y:number,z:number,h:number,w:number,d:number,attachTo:Object3D,cubeTexture:Texture):void{
        var cubeGeometry = new CubeGeometry(h*scaler,w*scaler,d*scaler);
        var thisCube:Mesh = new Mesh(cubeGeometry,new LambertMaterial({color: 0xffffff,map: cubeTexture}));
        //-----------Random Color Cubes(now replaced with textures)------------------------------------
        //var thisCube:Mesh = new Mesh(cubeGeometry,new LambertMaterial({color: Math.random() * 0xffffff}));
        
        thisCube.position.set(x*scaler,y*scaler,z*scaler);
        thisCube.castShadow = true;
        thisCube.receiveShadow = true;
        attachTo.add(thisCube);
 }
        

    }

    function addControl(controlObject: Control): void {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'groundCubeRotation',-0.25,0.25);
        gui.add(controlObject, 'secondCubeRotation',-0.25,0.25);
        gui.add(controlObject, 'thirdCubeRotation',-0.25,0.25);
        gui.add(controlObject, 'fourthCubeRotation',-0.25,0.25);
        gui.add(controlObject, 'fifthCubeRotation',-0.25,0.25);
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
    function gameLoop(): void {
        stats.update();
        
       //rotation 
       tower.children[0].rotation.y+=control.groundCubeRotation;
       tower.children[1].rotation.y+=control.secondCubeRotation;
       tower.children[2].rotation.y+=control.thirdCubeRotation;
       tower.children[3].rotation.y+=control.fourthCubeRotation;
       tower.children[4].rotation.y+=control.fifthCubeRotation;
           
       
       
       
       
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
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
    }

})();

