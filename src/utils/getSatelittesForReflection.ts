import {Mesh} from "@babylonjs/core/Meshes/mesh";

export const getSatellitesForReflection = (meshes: Mesh[], rootNames: string[]) => {
  const probes = {};
  meshes.forEach(mesh => {
    rootNames.forEach(rootName => {
      if (!probes.hasOwnProperty(rootName)) {
        probes[rootName] = [];
      }
      if (mesh.name !== rootName) {
        probes[rootName].push(mesh)
      }
    })
  });

  return probes
}
