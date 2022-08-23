import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {Scene} from "@babylonjs/core/scene";

export const getHighlightMeshes = (itemName: string, scene: Scene) => {
  const oneMesh = <Mesh>scene.getMeshByName(itemName);
  if (oneMesh) {
     return [oneMesh]
  } else {
    const transformNode = scene.getTransformNodeByName(itemName);
    if (transformNode) {
      return transformNode.getChildMeshes()
    } else {
      return []
    }
  }
}
