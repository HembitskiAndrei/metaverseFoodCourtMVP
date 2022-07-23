import type {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";

export const createIntersectionEnterAction = (
  instancedMesh: InstancedMesh,
  intersectionMesh: Mesh | InstancedMesh,
  callback: () => void
) => {
  (instancedMesh.actionManager as ActionManager).registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionEnterTrigger,
        parameter: intersectionMesh,
      },
      () => {
        callback();
      }
    )
  );
};

export const createIntersectionExitAction = (
  instancedMesh: InstancedMesh,
  intersectionMesh: Mesh | InstancedMesh,
  callback: () => void
) => {
  (instancedMesh.actionManager as ActionManager).registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionExitTrigger,
        parameter: intersectionMesh,
      },
      () => {
        callback();
      }
    )
  );
};
