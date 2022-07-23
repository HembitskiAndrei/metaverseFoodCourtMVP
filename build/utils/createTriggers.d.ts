import type { Scene } from "@babylonjs/core/scene";
import { IInstanceConfig } from "types";
import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
export declare const createTriggers: (configs: IInstanceConfig[], scene: Scene) => InstancedMesh[];
