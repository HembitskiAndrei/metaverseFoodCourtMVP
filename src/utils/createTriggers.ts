import type { Scene } from "@babylonjs/core/scene";
import { IInstanceConfig } from "types";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import type {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";

export const createTriggers = (
  configs: IInstanceConfig[],
  scene: Scene
) => {
  const triggerMesh = Mesh.CreateBox("triggerMesh", 1, scene);
  // triggerMesh.registerInstancedBuffer("triggersCount", 2);
  // triggerMesh.instancedBuffers.carsCount = new Vector2(0, 0);
  triggerMesh.visibility = 0;
  triggerMesh.position = new Vector3(0, -10, 0);

  const triggerInstances: InstancedMesh[] = [];
  configs.forEach((houseConfig) => {
    const triggerInstance = triggerMesh.createInstance(`${houseConfig.index}_instance`);
    // triggerInstance.instancedBuffers.carsCount = new Vector2(0, 0);
    triggerInstance.actionManager = new ActionManager(scene);
    triggerInstance.position = houseConfig.position;
    triggerInstance.scaling = houseConfig.size;
    triggerInstances.push(triggerInstance);
  });

  return triggerInstances;
};
