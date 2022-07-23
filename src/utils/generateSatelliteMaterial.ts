import {
  Mesh,
  PBRMaterial,
  Scene,
  ReflectionProbe,
  RenderTargetTexture
} from "@babylonjs/core";

export const generateSatelliteMaterial = (root: Mesh, others: Mesh[], scene: Scene) => {
  const probe = new ReflectionProbe("satelliteProbe" + root.name, 512, scene);
  probe.position = root.getAbsolutePosition();
  probe.refreshRate = RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
  others.forEach(mesh => {
    // @ts-ignore
    probe.renderList.push(mesh);
  });

  (root.material as PBRMaterial).metallic = 1;
  (root.material as PBRMaterial).roughness = 1;
  // (root.material as PBRMaterial).cameraContrast = 2;
  // (root.material as PBRMaterial).cameraExposure = 2.5;
  (root.material as PBRMaterial).reflectionTexture = probe.cubeTexture;

  probe.attachToMesh(root);
}
