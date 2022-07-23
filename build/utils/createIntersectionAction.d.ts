import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
export declare const createIntersectionEnterAction: (instancedMesh: InstancedMesh, intersectionMesh: Mesh | InstancedMesh, callback: () => void) => void;
export declare const createIntersectionExitAction: (instancedMesh: InstancedMesh, intersectionMesh: Mesh | InstancedMesh, callback: () => void) => void;
