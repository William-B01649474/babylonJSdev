import { Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Engine } from "@babylonjs/core";

export default function createGameScene(engine: Engine): Scene {
  const scene = new Scene(engine);

  // Camera setup
  const camera = new ArcRotateCamera("camera", Math.PI / 4, Math.PI / 4, 10, Vector3.Zero(), scene);
  camera.attachControl(engine.getRenderingCanvas(), true);

  // Lighting setup
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  // Add objects to the scene
  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
  sphere.position.y = 1;

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  // Additional game scene elements can be added here
  // For example, add more meshes, physics, animations, etc.

  return scene;
}
