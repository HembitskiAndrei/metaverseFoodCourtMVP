import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import "@babylonjs/core/Layers/effectLayerSceneComponent";
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
export declare class MainScene extends Scene {
    engine: Engine;
    canvas: HTMLCanvasElement;
    assetsManager: AssetsManager;
    camera: ArcRotateCamera;
    advancedTexture: AdvancedDynamicTexture;
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions);
    loadPlayer(scene: Scene, engine: Engine, canvas: HTMLCanvasElement): void;
}
