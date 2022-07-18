import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import "@babylonjs/core/Layers/effectLayerSceneComponent";
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Rendering/index';
// import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import {
  Color4,
  // Color3
} from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
// import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import { createEnvironment } from "../utils/createEnvironment";
import {
  // ActionData,
  CharacterController
} from "../components/CharacterController";
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial";
// import {AnimationGroup} from "@babylonjs/core";

export class MainScene extends Scene {
  engine: Engine;
  canvas: HTMLCanvasElement;
  assetsManager: AssetsManager;
  camera: ArcRotateCamera;
  advancedTexture: AdvancedDynamicTexture;

  constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
    super(engine, options);
    this.engine = engine;
    this.canvas = canvas;
    this.clearColor = Color4.FromHexString("#768384ff");

    this.assetsManager = new AssetsManager(this);

    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI");
    this.advancedTexture.renderAtIdealSize = true;

    const glowLayer = new GlowLayer("glowLayer", this, {
      blurKernelSize: 128,
      mainTextureRatio: 0.5,
      ldrMerge: true,
    });
    glowLayer.intensity = 2;

    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, this);
    ground.freezeWorldMatrix();
    ground.checkCollisions = true;
    ground.isPickable = true;

    const groundMaterial = new PBRMaterial("groundMaterial", this);
    groundMaterial.metallic = 0;
    groundMaterial.roughness = 1;
    ground.material = groundMaterial;

    const gridTextureTask = this.assetsManager.addTextureTask("gridTextureTask", "./assets/textures/grid.png");
    gridTextureTask.onSuccess = task => {
      groundMaterial.albedoTexture = task.texture;
    }

    this.camera = new ArcRotateCamera("Camera", 0, Math.PI / 2, 15, new Vector3(0, 5, 5), this);
    this.camera.position = new Vector3(0, 6, 10);
    this.camera.minZ = 0.0;
    this.camera.maxZ = 100;
    this.camera.lowerRadiusLimit = 7;
    this.camera.upperRadiusLimit = 12;
    this.camera.wheelDeltaPercentage = 0.01;
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas);

    createEnvironment(this);

    this.loadPlayer(this, engine, canvas);

    this.assetsManager.onFinish = () => {
      // this.executeWhenReady(() => {});
    };

    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    this.engine.runRenderLoop(() => {
      this.render();
    });

    this.assetsManager.load();
  }

  loadPlayer(scene: Scene, engine: Engine, canvas: HTMLCanvasElement) {
    const playerMeshTask = this.assetsManager.addMeshTask("playerMeshTask", "", "./assets/player/", "player.glb");
    playerMeshTask.onSuccess = task => {
        let player = task.loadedMeshes[0];
        player.rotationQuaternion = null;

      // const skinMaterial = (this.getMeshByName("Body") as Mesh).material as PBRMaterial;
      // skinMaterial.subSurface.isScatteringEnabled = true;
      // // @ts-ignore
      // this.enablePrePassRenderer().metersPerUnit = 0.7;
      // skinMaterial.metallic = 0;
      // skinMaterial.roughness = 0.67;
      // skinMaterial.subSurface.diffusionDistance = new Color3(1, 0.537, 0.537);
      // skinMaterial.subSurface.scatteringDiffusionProfile = new Color3(1.0, 0.5, 0.25);
      // // skinMaterial.subSurface.maximumThickness = 2.2;
      // skinMaterial.subSurface.isTranslucencyEnabled = true;
      // skinMaterial.subSurface.translucencyIntensity = 0.9;
      // // @ts-ignore
      // this.enablePrePassRenderer().samples = 8;

        player.position = new Vector3(0,0,0);
        player.checkCollisions = true;
        player.ellipsoid = new Vector3(0.5,1,0.5);
        player.ellipsoidOffset = new Vector3(0,1,0);

        let alpha = 0;
        let beta = Math.PI/2.5;
        let target = new Vector3(player.position.x,player.position.y+1.5,player.position.z);

        let camera = new ArcRotateCamera("ArcRotateCamera",alpha,beta,4,target,scene);
        camera.minZ = 0.0;
        camera.wheelPrecision = 15;
        camera.checkCollisions = false;
        camera.keysLeft = [];
        camera.keysRight = [];
        camera.keysUp = [];
        camera.keysDown = [];
        camera.lowerRadiusLimit = 0.5;
        camera.upperRadiusLimit = 20;
        camera.attachControl(canvas,false);
        this.activeCamera = camera;

        const animationGroups = {};
        task.loadedAnimationGroups.forEach(group => {
          animationGroups[group.name] = group;
        });
        animationGroups["jump"].loop = false;
        const agMap = {
          walk: animationGroups["walk"],
          walkBack: animationGroups["walkingBack"],
          idle: animationGroups["idle"],
          idleJump: animationGroups["jump"],
          walkBackFast: animationGroups["joggingBack"],
          run: animationGroups["jogging"],
          runJump: animationGroups["jump"],
          fall: animationGroups["falling"],
          turnRight: animationGroups["turnRight"],
          turnRightFast: animationGroups["turnRight"],
          turnLeft: animationGroups["turnLeft"],
          turnLeftFast: animationGroups["turnLeft"],
          strafeLeft: animationGroups["walkLeftStrafe"],
          strafeLeftFast: animationGroups["jogLeftStrafe"],
          strafeRight: animationGroups["walkRightStrafe"],
          strafeRightFast: animationGroups["jogRightStrafe"],
          diagonalLeftForward: animationGroups["walkLeftForward"],
          diagonalLeftForwardFast: animationGroups["joggingLeftForward"],
          diagonalRightForward: animationGroups["walkRightForward"],
          diagonalRightForwardFast: animationGroups["joggingRightForward"],
          diagonalLeftBack: animationGroups["walkingLeftBack"],
          diagonalLeftBackFast: animationGroups["joggingLeftBack"],
          diagonalRightBack: animationGroups["walkingRightBack"],
          diagonalRightBackFast: animationGroups["joggingRightBack"],
          slideDown: animationGroups["falling"],
        }

        let cc = new CharacterController(<Mesh>player, camera, scene, agMap, true);
        cc.setCameraTarget(new Vector3(0,1.7,0));
        cc.setNoFirstPerson(false);
        cc.setStepOffset(0.4);
        //the minimum and maximum slope the player can go up
        //between the two the player will start sliding down if it stops
        cc.setSlopeLimit(30,60);
        cc.enableBlending(0.075);

        cc.setStrafeLeftAnim(animationGroups["walkLeftStrafe"], 1.4, true);
        cc.setStrafeRightAnim(animationGroups["walkRightStrafe"], 1.4, true);
        cc.setLeftSpeed(0.8);
        cc.setRightSpeed(0.8);
        cc.setRightFastSpeed(1.6);
        cc.setLeftFastSpeed(1.6);
        cc.setStrafeFactor(1);
        cc.setStrafeFactorWithBackward(0.2);

        cc.setWalkSpeed(1.8);
        cc.setBackSpeed(1.1);

        cc.setDiagonalLeftSpeed(1.0);
        cc.setDiagonalRightForwardSpeed(1.0);
        cc.setStrafeFactorWithForward(0.8);

        cc.start();

        engine.runRenderLoop(function(){
          scene.render();
        });
    };
    // SceneLoader.ImportMesh("","./assets/player/","Vincent.babylon",scene,(meshes,particleSystems,skeletons)=>{
    //   let player = meshes[0];
    //   let skeleton = skeletons[0];
    //   player.skeleton = skeleton;
    //
    //   skeleton.enableBlending(0.1);
    //   //if the skeleton does not have any animation ranges then set them as below
    //   // setAnimationRanges(skeleton);
    //
    //   let sm = <StandardMaterial>player.material;
    //   if(sm.diffuseTexture!=null){
    //     sm.backFaceCulling = true;
    //     sm.ambientColor = new Color3(1,1,1);
    //   }
    //
    //
    //   player.position = new Vector3(0,12,0);
    //   player.checkCollisions = true;
    //   player.ellipsoid = new Vector3(0.5,1,0.5);
    //   player.ellipsoidOffset = new Vector3(0,1,0);
    //
    //   //rotate the camera behind the player
    //   let alpha = -player.rotation.y-4.69;
    //   let beta = Math.PI/2.5;
    //   let target = new Vector3(player.position.x,player.position.y+1.5,player.position.z);
    //
    //   let camera = new ArcRotateCamera("ArcRotateCamera",alpha,beta,4,target,scene);
    //   camera.minZ = 0.0;
    //   //standard camera setting
    //   camera.wheelPrecision = 15;
    //   camera.checkCollisions = false;
    //   //make sure the keyboard keys controlling camera are different from those controlling player
    //   //here we will not use any keyboard keys to control camera
    //   camera.keysLeft = [];
    //   camera.keysRight = [];
    //   camera.keysUp = [];
    //   camera.keysDown = [];
    //   //how close can the camera come to player
    //   camera.lowerRadiusLimit = 0.5;
    //   //how far can the camera go from the player
    //   camera.upperRadiusLimit = 20;
    //   camera.attachControl(canvas,false);
    //   this.activeCamera = camera;
    //
    //   //let CharacterController = org.ssatguru.babylonjs.component.CharacterController;
    //   let cc = new CharacterController(<Mesh>player,camera,scene);
    //   //below makes the controller point the camera at the player head which is approx
    //   //1.5m above the player origin
    //   cc.setCameraTarget(new Vector3(0,1.7,0));
    //
    //   //if the camera comes close to the player we want to enter first person mode.
    //   cc.setNoFirstPerson(false);
    //   //the height of steps which the player can climb
    //   cc.setStepOffset(0.4);
    //   //the minimum and maximum slope the player can go up
    //   //between the two the player will start sliding down if it stops
    //   cc.setSlopeLimit(30,60);
    //
    //   //tell controller
    //   // - which animation range should be used for which player animation
    //   // - rate at which to play that animation range
    //   // - wether the animation range should be looped
    //   //use this if name, rate or looping is different from default
    //   cc.setIdleAnim("idle",1,true);
    //   cc.setTurnLeftAnim("turnLeft",0.5,true);
    //   cc.setTurnRightAnim("turnRight",0.5,true);
    //   cc.setWalkBackAnim("walkBack",0.5,true);
    //   cc.setIdleJumpAnim("idleJump",.5,false);
    //   cc.setRunJumpAnim("runJump",0.6,false);
    //   //set the animation range name to "null" to prevent the controller from playing
    //   //a player animation.
    //   //here even though we have an animation range called "fall" we donot want to play
    //   //the fall animation
    //   // @ts-ignore
    //   cc.setFallAnim(null,2,false);
    //   cc.setSlideBackAnim("slideBack",2,false)
    //
    //   cc.start();
    //
    //   engine.runRenderLoop(function(){
    //     scene.render();
    //   });
    //
    // });
  }
}
