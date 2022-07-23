import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import "@babylonjs/core/Layers/effectLayerSceneComponent";
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Rendering/index';
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import {
  Color4,
  Color3
} from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import { createEnvironment } from "../utils/createEnvironment";
import { CharacterController } from "../components/CharacterController";
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial";
import {DefaultRenderingPipeline} from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import {FxaaPostProcess, TonemapPostProcess, TonemappingOperator, ColorCorrectionPostProcess} from "@babylonjs/core/PostProcesses/";
import {TRIGGER_CONFIGS, LABEL_ANIMATION_DURATION, MENU_CONFIGS} from "../utils/constants";
import {createTriggers} from "../utils/createTriggers";
import {generateSatelliteMaterial} from "../utils/generateSatelliteMaterial";
import {createIntersectionEnterAction, createIntersectionExitAction} from "../utils/createIntersectionAction";
import {HighlightLayer} from "@babylonjs/core/Layers/highlightLayer";
import {getSatellitesForReflection} from "../utils/getSatelittesForReflection";
import {AddInfoPopUp, createAdvancedTextureForGUI} from "../utils/gui";
import {InfoAnimation} from "../utils/infoAnimation";
import {Texture} from "@babylonjs/core/Materials/Textures/texture";

export class MainScene extends Scene {
  engine: Engine;
  canvas: HTMLCanvasElement;
  assetsManager: AssetsManager;
  camera: ArcRotateCamera;
  advancedTexture: AdvancedDynamicTexture;
  hl: HighlightLayer;

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
    glowLayer.intensity = 0.5;

    this.hl = new HighlightLayer("highlightLayer", this);
    this.hl.innerGlow = false;
    this.hl.outerGlow = true;

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
    this.camera.layerMask = 2;
    this.camera.position = new Vector3(0, 6, 10);
    this.camera.minZ = 0.0;
    this.camera.maxZ = 100;
    this.camera.lowerRadiusLimit = 7;
    this.camera.upperRadiusLimit = 12;
    this.camera.wheelDeltaPercentage = 0.01;
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas);

    // const bgCamera = new ArcRotateCamera("Camera", 0, Math.PI / 2, 15, new Vector3(0, 5, 5), this);
    // bgCamera.layerMask = 2;

    createEnvironment(this);

    const advancedDynamicTexture = createAdvancedTextureForGUI("gui");
    // @ts-ignore
    advancedDynamicTexture.layer.layerMask = 2;

    const menuInfos = {};
    for (const [key, value] of Object.entries(MENU_CONFIGS)) {
      menuInfos[key] = AddInfoPopUp(
        value,
        advancedDynamicTexture
      );
    }

    const roomMeshTask = this.assetsManager.addMeshTask("roomMeshTask", "", "./assets/meshes/", "room.glb");
    roomMeshTask.onSuccess = task => {
      const room = <Mesh>this.getMeshByName("room");
      room.checkCollisions = true;
      const glass = <Mesh>this.getMeshByName("glass");

      const glassMaterial = glass.material as PBRMaterial;
      glassMaterial.albedoColor = Color3.White();
      glassMaterial.metallic = 1;
      glassMaterial.roughness = 1;
      glassMaterial.alpha = 0.05;
      glassMaterial.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
      // sheen
      glassMaterial.sheen.isEnabled = true;
      if(glassMaterial.sheen){
        glassMaterial.sheen.color = Color3.FromHexString("#98e9ff");
      }
      // SSS things
      glassMaterial.subSurface.tintColor = Color3.FromHexString("#c4eaff");
      glassMaterial.subSurface.isTranslucencyEnabled = true;
      if (glassMaterial.subSurface.isTranslucencyEnabled) {
        glassMaterial.subSurface.translucencyIntensity = 2;
        glassMaterial.subSurface.minimumThickness = 1;
        glassMaterial.subSurface.maximumThickness = 2.1;
      }
      glassMaterial.subSurface.isRefractionEnabled = true;
      if (glassMaterial.subSurface.isRefractionEnabled) {
        glassMaterial.subSurface.indexOfRefraction = 3;
        glassMaterial.subSurface.refractionIntensity = 2;
        glassMaterial.subSurface.tintColorAtDistance = 1;
        glassMaterial.refractionTexture = this.environmentTexture;
      }


      const furniture = <Mesh>this.getMeshByName("furniture");
      furniture.checkCollisions = true;
      const furniture2 = <Mesh>this.getMeshByName("furniture_2");
      furniture2.checkCollisions = true;
      const bar = <Mesh>this.getMeshByName("bar");
      bar.checkCollisions = true;
      const ceiling = <Mesh>this.getMeshByName("ceiling");
      ceiling.checkCollisions = true;
      (ceiling.material as PBRMaterial).environmentIntensity = 0.25;
      const chair = <Mesh>this.getMeshByName("chair");
      chair.checkCollisions = true;

      this.hl.addExcludedMesh(glass);
      this.hl.addExcludedMesh(furniture);
      this.hl.addExcludedMesh(furniture2);

      const probes = getSatellitesForReflection(<Mesh[]>this.meshes, ["glass", "furniture", "furniture_2", "bar", 'room']);

      generateSatelliteMaterial(room, probes["room"], this);
      generateSatelliteMaterial(glass, probes["glass"], this);
      generateSatelliteMaterial(bar, probes["bar"], this);
      generateSatelliteMaterial(furniture, probes["furniture"], this);
      generateSatelliteMaterial(furniture2, probes["furniture_2"], this);
    }

    this.loadPlayer(this, engine, canvas);

    const triggerInstances = createTriggers(TRIGGER_CONFIGS, this);

    this.assetsManager.onFinish = () => {
      const shoes = <Mesh>this.getMeshByName("Shoes");
      triggerInstances.forEach((triggerInstance) => {
          createIntersectionEnterAction(triggerInstance, shoes, () => {
            const itemName = triggerInstance.name.split("_")[0];
            this.hl.addMesh(<Mesh>this.getMeshByName(itemName), Color3.Red());
            InfoAnimation(
              menuInfos[itemName].container,
              0,
              1,
              LABEL_ANIMATION_DURATION
            ).play(false);
          });
          createIntersectionExitAction(triggerInstance, shoes, () => {
            const itemName = triggerInstance.name.split("_")[0];
            this.hl.removeMesh(<Mesh>this.getMeshByName(itemName));
            InfoAnimation(
              menuInfos[itemName].container,
              1,
              0,
              LABEL_ANIMATION_DURATION
            ).play(false);
          });
      });

      this.lights.forEach(light => {
        light.intensity = 0.75;
      });
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

        player.position = new Vector3(0,0,0);
        player.checkCollisions = true;
        player.ellipsoid = new Vector3(0.3,1,0.3);
        player.ellipsoidOffset = new Vector3(0,1,0);

        let alpha = 0;
        let beta = Math.PI/2.5;
        let target = new Vector3(player.position.x,player.position.y+1.5,player.position.z);

        let camera = new ArcRotateCamera("ArcRotateCamera",alpha,beta,2,target,scene);
        camera.minZ = 0.0;
        camera.wheelPrecision = 15;
        camera.checkCollisions = false;
        camera.keysLeft = [];
        camera.keysRight = [];
        camera.keysUp = [];
        camera.keysDown = [];
        camera.lowerRadiusLimit = 0.5;
        camera.upperRadiusLimit = 4;
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
          fall: null,
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
          slideDown: null,
        }

        let cc = new CharacterController(<Mesh>player, camera, scene, agMap, true);
        cc.setCameraTarget(new Vector3(0,1.7,0));
        cc.setNoFirstPerson(false);
        cc.setStepOffset(0.4);
        //the minimum and maximum slope the player can go up
        //between the two the player will start sliding down if it stops
        cc.setSlopeLimit(30,60);
        cc.enableBlending(0.075);

        cc.setStrafeLeftAnim(animationGroups["walkLeftStrafe"], 1.6, true);
        cc.setStrafeRightAnim(animationGroups["walkRightStrafe"], 1.6, true);
        cc.setLeftSpeed(1);
        cc.setRightSpeed(1);
        cc.setRightFastSpeed(2.4);
        cc.setLeftFastSpeed(2.4);

        cc.setWalkAnim(animationGroups["walk"], 1, true);
        cc.setWalkSpeed(1.5);
        cc.setRunAnim(animationGroups["jogging"], 1, true);
        cc.setRunSpeed(2.6);
        cc.setWalkBackAnim(animationGroups["walkingBack"], 1, true);
        cc.setBackSpeed(1.1);
        cc.setWalkBackFastAnim(animationGroups["joggingBack"], 1.1, true);
        cc.setBackFastSpeed(2.4);

        cc.setDiagonalRightForwardAnim(animationGroups["walkRightForward"], 1, true);
        cc.setDiagonalLeftForwardAnim(animationGroups["walkLeftForward"], 1, true);
        cc.setDiagonalLeftForwardSpeed(0.8);
        cc.setDiagonalRightForwardSpeed(0.8);
        cc.setStrafeFactorWithForward(1.7);

        cc.setDiagonalRightForwardFastAnim(animationGroups["joggingRightForward"], 1, true);
        cc.setDiagonalLeftForwardFastAnim(animationGroups["joggingLeftForward"], 1, true);
        cc.setDiagonalLeftForwardFastSpeed(2);
        cc.setDiagonalRightForwardFastSpeed(2);
        cc.setStrafeFactorWithForwardFast(2.7);

        cc.setDiagonalRightBackAnim(animationGroups["walkRightBack"], 1.1, true);
        cc.setDiagonalLeftBackAnim(animationGroups["walkLeftBack"], 1.1, true);
        cc.setDiagonalLeftBackSpeed(0.6);
        cc.setDiagonalRightBackSpeed(0.6);
        cc.setStrafeFactorWithBackward(1.7);

        cc.setDiagonalRightBackFastAnim(animationGroups["joggingRightBack"], 1, true);
        cc.setDiagonalLeftBackFastAnim(animationGroups["joggingLeftBack"], 1, true);
        cc.setDiagonalLeftBackFastSpeed(1.5);
        cc.setDiagonalRightBackFastSpeed(1.5);
        cc.setStrafeFactorWithBackwardFast(2.7);

        cc.start();

      // const defaultPipeline = new DefaultRenderingPipeline("default", true, this, [camera]);
      // defaultPipeline.imageProcessing.contrast = 1;
      // defaultPipeline.imageProcessing.exposure = 1;
      const fxaaPostProcess = new FxaaPostProcess("fxaa", 2.0, camera);
      // const tonemapPostProcess = new TonemapPostProcess("tonemap", TonemappingOperator.Photographic, 1.0, camera);
      const colorCorrectionPostProcess = new ColorCorrectionPostProcess("color_correction", "./assets/textures/lut.png", 1.0, camera);
    };
  }
}
